/* ══════════════════════════════════════
   publications.js
   Fetches works from ORCID public API
   including full author lists.
══════════════════════════════════════ */

var ORCID_ID  = "0009-0005-9686-6128";
var BASE      = "https://pub.orcid.org/v3.0/";
var container = document.getElementById("pubs-list");

// Fetch the works summary list first
fetch(BASE + ORCID_ID + "/works", {
  headers: { "Accept": "application/json" }
})
.then(function(res) {
  if (!res.ok) throw new Error("ORCID API error: " + res.status);
  return res.json();
})
.then(function(data) {
  var groups = data.group || [];

  if (groups.length === 0) {
    container.innerHTML = "<p class='pubs-empty'>No publications found on ORCID yet.</p>";
    return;
  }

  // Build a list of put-codes to fetch full records
  var summaries = groups.map(function(group) {
    var s = group["work-summary"][0];
    return {
      putCode: s["put-code"],
      year: s["publication-date"] && s["publication-date"].year
            ? parseInt(s["publication-date"].year.value) : 0
    };
  });

  // Sort by year descending before fetching
  summaries.sort(function(a, b) { return b.year - a.year; });

  // Fetch full record for each work (for author list)
  var fetches = summaries.map(function(s) {
    return fetch(BASE + ORCID_ID + "/work/" + s.putCode, {
      headers: { "Accept": "application/json" }
    }).then(function(r) { return r.json(); });
  });

  return Promise.all(fetches);
})
.then(function(works) {
  if (!works) return;

  var html = '<ol class="pubs-ol">';

  works.forEach(function(w) {
    // Title
    var title = w.title && w.title.title
                ? w.title.title.value
                : "Untitled";

    // Year
    var year = w["publication-date"] && w["publication-date"].year
               ? w["publication-date"].year.value
               : null;

    // Journal
    var journal = w["journal-title"] ? w["journal-title"].value : null;

    // Authors
    var authorList = [];
    if (w.contributors && w.contributors.contributor) {
      w.contributors.contributor.forEach(function(c) {
        if (c["credit-name"] && c["credit-name"].value) {
          authorList.push(c["credit-name"].value);
        }
      });
    }
    var authorsStr = authorList.length > 0 ? authorList.join(", ") : null;

    // DOI
    var doi = null;
    var ids = w["external-ids"] && w["external-ids"]["external-id"]
              ? w["external-ids"]["external-id"] : [];
    ids.forEach(function(id) {
      if (id["external-id-type"] === "doi") doi = id["external-id-value"];
    });

    var doiLink = doi
      ? '<a href="https://doi.org/' + doi + '" target="_blank" class="pub-doi">DOI →</a>'
      : '';

    // Build meta line: journal · year · DOI
    var metaParts = [];
    if (journal) metaParts.push('<span class="pub-journal">' + journal + '</span>');
    if (year)    metaParts.push('<span class="pub-year">' + year + '</span>');
    if (doiLink) metaParts.push(doiLink);

    html += '<li class="pub-item">';
    html +=   '<p class="pub-title">' + title + '</p>';
    if (authorsStr) {
      html += '<p class="pub-authors">' + authorsStr + '</p>';
    }
    if (metaParts.length) {
      html += '<p class="pub-meta">' + metaParts.join(' &middot; ') + '</p>';
    }
    html += '</li>';
  });

  html += '</ol>';
  container.innerHTML = html;
})
.catch(function(err) {
  container.innerHTML = "<p class='pubs-error'>Could not load publications. Please visit my <a href='https://orcid.org/0009-0005-9686-6128' target='_blank'>ORCID profile</a> directly.</p>";
  console.error(err);
});

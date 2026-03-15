/* ══════════════════════════════════════
   publications.js
   Fetches works from ORCID public API
   and renders them as a citation list.
══════════════════════════════════════ */

var ORCID_ID = "0009-0005-9686-6128";
var container = document.getElementById("pubs-list");

fetch("https://pub.orcid.org/v3.0/" + ORCID_ID + "/works", {
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

  // Extract and sort by year descending
  var works = groups.map(function(group) {
    var summary = group["work-summary"][0];
    var title   = summary.title && summary.title.title
                  ? summary.title.title.value
                  : "Untitled";
    var year    = summary["publication-date"] && summary["publication-date"].year
                  ? parseInt(summary["publication-date"].year.value)
                  : 0;
    var journal = summary["journal-title"]
                  ? summary["journal-title"].value
                  : null;
    var type    = summary["work-type"] || null;

    // Get DOI if available
    var doi = null;
    var ids = summary["external-ids"] && summary["external-ids"]["external-id"]
              ? summary["external-ids"]["external-id"]
              : [];
    ids.forEach(function(id) {
      if (id["external-id-type"] === "doi") {
        doi = id["external-id-value"];
      }
    });

    // Get contributor/author string from the group level
    var authors = null;
    var contribs = group["work-summary"][0]["source"]
                   ? group["work-summary"][0]["source"]["source-name"]
                   : null;

    return { title: title, year: year, journal: journal, type: type, doi: doi };
  });

  // Sort most recent first
  works.sort(function(a, b) { return b.year - a.year; });

  // Render
  var html = '<ol class="pubs-ol">';
  works.forEach(function(w) {
    var link = w.doi
      ? '<a href="https://doi.org/' + w.doi + '" target="_blank" class="pub-doi">DOI →</a>'
      : '';
    var meta = [];
    if (w.journal) meta.push('<span class="pub-journal">' + w.journal + '</span>');
    if (w.year)    meta.push('<span class="pub-year">'    + w.year    + '</span>');

    html += '<li class="pub-item">';
    html +=   '<p class="pub-title">' + w.title + '</p>';
    if (meta.length || link) {
      html += '<p class="pub-meta">' + meta.join(' &middot; ') + (link ? ' &middot; ' + link : '') + '</p>';
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

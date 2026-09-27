export default function ImageCreditsPage() {
  const credits = [
    {
      species: "American Crow",
      photographer: "Courtney Celley",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:American_crow_(54055201816).jpg",
      license: "Public domain",
    },
    {
      species: "American Goldfinch",
      photographer: "Gary Sonnenberg",
      license: "Photograph by Gary Sonnenberg",
    },
    {
      species: "American Kestrel",
      photographer: "Courtney Celley",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:American_kestrel_(54474167930).jpg",
      license: "Public domain",
    },
    {
      species: "American Robin",
      photographer: "Gary Sonnenberg",
      license: "Photograph by Gary Sonnenberg",
    },
    {
      species: "American White Pelican",
      photographer: "Diane Renkin",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:American_white_pelican_in_Yellowstone_River_(32223510923).jpg",
      license: "Public domain",
    },
    {
      species: "American Woodcock",
      photographer: "Kimberly Emerson",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:American_woodcock_(53625429918).jpg",
      license: "Public domain",
    },
    {
      species: "Bald Eagle",
      photographer: "Courtney Celley",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:Bald_eagle_(53545492541).jpg",
      license: "Public domain",
    },
    {
      species: "Baltimore Oriole",
      photographer: "David Brezinski",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:Baltimore_Oriole.jpg",
      license: "Public domain",
    },
    {
      species: "Barn Swallow",
      photographer: "Nate Rathbun",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:Barn_Swallow_(34869731935).jpg",
      license: "Public domain",
    },
    {
      species: "Barred Owl",
      photographer: "Mara Koenig",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:Barred_Owl_(51099563028).jpg",
      license: "Public domain",
    },
    {
      species: "Belted Kingfisher",
      photographer: "Courtney Celley",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:Belted_kingfisher_(52842368381).jpg",
      license: "Public domain",
    },
    {
      species: "Black-capped Chickadee",
      photographer: "Gary Sonnenberg",
      license: "Photograph by Gary Sonnenberg",
    },
    {
      species: "Blue Jay",
      photographer: "Gary Sonnenberg",
      license: "Photograph by Gary Sonnenberg",
    },
    {
      species: "Blue-gray Gnatcatcher",
      photographer: "N. Lewis",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:Blue-Gray_Gnatcatcher_(27541488515).jpg",
      license: "Public domain",
    },
    {
      species: "Brown Creeper",
      photographer: "Jacob W. Frank",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:A_brown_creeper_(Certhia_americana)_searches_for_food_(46559899704).jpg",
      license: "Public domain",
    },
    {
      species: "Brown Thrasher",
      photographer: "Julia C. Johnson",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:A_brown_thrasher_sits_on_a_wire_in_Lake_Andes_National_Wildlife_Refuge_in_South_Dakota_(53758149490).jpg",
      license: "Public domain",
    },
    {
      species: "Brown-headed Cowbird",
      photographer: "Gary Sonnenberg",
      license: "Photograph by Gary Sonnenberg",
    },
    {
      species: "Canada Goose",
      photographer: "Jim Hudgins",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:Canada_goose_(53675919760).jpg",
      license: "Public domain",
    },
    {
      species: "Cedar Waxwing",
      photographer: "NPS",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:Cedar_Waxwing_(61f67db1-baf1-4e8a-baa6-757c1fd82829).jpg",
      license: "Public domain",
    },
    {
      species: "Chipping Sparrow",
      photographer: "Courtney Celley",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:Chipping_sparrow_(53043669431).jpg",
      license: "Public domain",
    },
    {
      species: "Common Grackle",
      photographer: "Gary Sonnenberg",
      license: "Photograph by Gary Sonnenberg",
    },
    {
      species: "Common Merganser",
      photographer: "Courtney Celley",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:Common_merganser_(53804472563).jpg",
      license: "Public domain",
    },
    {
      species: "Common Yellowthroat",
      photographer: "Jake Bonello",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:Common_yellowthroat_in_Washington_state_(52937849634).jpg",
      license: "Public domain",
    },
    {
      species: "Cooper's Hawk",
      photographer: "Gary Sonnenberg",
      license: "Photograph by Gary Sonnenberg",
    },
    {
      species: "Dark-eyed Junco",
      photographer: "Courtney Celley",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:Dark-eyed_junco_(52082620245).jpg",
      license: "Public domain",
    },
    {
      species: "Double-crested Cormorant",
      photographer: "Kaldari",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:Double-crested_Cormorant_(Phalacrocorax_auritus)_Florida.jpg",
      license: "CC0",
    },
    {
      species: "Downy Woodpecker",
      photographer: "Gary Sonnenberg",
      license: "Photograph by Gary Sonnenberg",
    },
    {
      species: "Eastern Bluebird",
      photographer: "Courtney Celley",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:Eastern_bluebirds_(53285555328).jpg",
      license: "Public domain",
    },
    {
      species: "Eastern Phoebe",
      photographer: "Courtney Celley",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:Eastern_phoebe_(53074226382).jpg",
      license: "Public domain",
    },
    {
      species: "Eastern Towhee",
      photographer: "N. Lewis",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:Eastern_Towhee_(44722574255).jpg",
      license: "Public domain",
    },
    {
      species: "European Starling",
      photographer: "N. Lewis",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:European_Starling_(30695326287).jpg",
      license: "Public domain",
    },
    {
      species: "Gray Catbird",
      photographer: "Wyatt006",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:BirdonBranch_5-10-2025.jpg",
      license: "CC0",
    },
    {
      species: "Great Blue Heron",
      photographer: "Tom Koerner",
      source: "U.S. Fish & Wildlife Service",
      url: "https://www.fws.gov/media/great-blue-heron-seedskadee-national-wildlife-refuge",
      license: "Public domain",
    },
    {
      species: "Great Egret",
      photographer: "Peter Pearsall",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:Great_egret_(49558280038).jpg",
      license: "Public domain",
    },
    {
      species: "Great Horned Owl",
      photographer: "Jake Bonello",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:Great_horned_owl_(52034802547).jpg",
      license: "Public domain",
    },
    {
      species: "Green Heron",
      photographer: "Alyssa Lu",
      source: "U.S. Fish & Wildlife Service",
      url: "https://www.fws.gov/media/green-heron-perched-log",
      license: "Public domain",
    },
    {
      species: "Hairy Woodpecker",
      photographer: "Gary Sonnenberg",
      license: "Photograph by Gary Sonnenberg",
    },
    {
      species: "House Finch",
      photographer: "Gary Sonnenberg",
      license: "Photograph by Gary Sonnenberg",
    },
    {
      species: "House Sparrow",
      photographer: "Gary Sonnenberg",
      license: "Photograph by Gary Sonnenberg",
    },
    {
      species: "Indigo Bunting",
      photographer: "Grayson Smith",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:Indigo_Bunting_(48404228777).jpg",
      license: "Public domain",
    },
    {
      species: "Killdeer",
      photographer: "Grayson Smith",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:Killdeer_(48404083276).jpg",
      license: "Public domain",
    },
    {
      species: "Mallard",
      photographer: "A. LaValle",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:Male_Mallard_at_Billy_Frank_Jr_Nisqually_National_Wildlife_Refuge_(53357871752).jpg",
      license: "Public domain",
    },
    {
      species: "Mourning Dove",
      photographer: "Gary Sonnenberg",
      license: "Photograph by Gary Sonnenberg",
    },
    {
      species: "Northern Cardinal",
      photographer: "Gary Sonnenberg",
      license: "Photograph by Gary Sonnenberg",
    },
    {
      species: "Northern Flicker",
      photographer: "Gary Sonnenberg",
      license: "Photograph by Gary Sonnenberg",
    },
    {
      species: "Northern House Wren",
      photographer: "Grayson Smith",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:House_Wren_(48935527637).jpg",
      license: "Public domain",
    },
    {
      species: "Northern Mockingbird",
      photographer: "Matt Poole",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:Northern_Mockingbird_(50860137128).jpg",
      license: "Public domain",
    },
    {
      species: "Pileated Woodpecker",
      photographer: "Joe Kosack",
      source: "U.S. Fish & Wildlife Service",
      url: "https://www.fws.gov/media/pileated-woodpecker-6",
      license: "Public domain",
    },
    {
      species: "Pine Siskin",
      photographer: "Courtney Celley",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:Pine_siskin_(54364998064).jpg",
      license: "Public domain",
    },
    {
      species: "Purple Finch",
      photographer: "Courtney Celley",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:Purple_finch_(54473897659).jpg",
      license: "Public domain",
    },
    {
      species: "Red-bellied Woodpecker",
      photographer: "Jim Hudgins",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:Red-bellied_woodpecker_(53614140717).jpg",
      license: "Public domain",
    },
    {
      species: "Red-breasted Nuthatch",
      photographer: "Courtney Celley",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:Red-breasted_nuthatch_(54365342849).jpg",
      license: "Public domain",
    },
    {
      species: "Red-headed Woodpecker",
      photographer: "Jim Hudgins",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:Red-headed_woodpecker_(28012840837).jpg",
      license: "Public domain",
    },
    {
      species: "Red-tailed Hawk",
      photographer: "Courtney Celley",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:Red-tailed_hawk_(53198880548).jpg",
      license: "Public domain",
    },
    {
      species: "Red-winged Blackbird",
      photographer: "Courtney Celley",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:Red-winged_blackbird_(53769250621).jpg",
      license: "Public domain",
    },
    {
      species: "Ring-billed Gull",
      photographer: "Jim Hudgins",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:Ring-billed_gull_at_Shiawassee_National_Wildlife_Refuge_(33684745135).jpg",
      license: "Public domain",
    },
    {
      species: "Rose-breasted Grosbeak",
      photographer: "Courtney Celley",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:Rose-breasted_grosbeak_(48249944177).jpg",
      license: "Public domain",
    },
    {
      species: "Ruby-throated Hummingbird",
      photographer: "Gary Sonnenberg",
      license: "Photograph by Gary Sonnenberg",
    },
    {
      species: "Sandhill Crane",
      photographer: "Gary Sonnenberg",
      license: "Photograph by Gary Sonnenberg",
    },
    {
      species: "Scarlet Tanager",
      photographer: "Courtney Celley",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:Scarlet_tanager_(54551233502).jpg",
      license: "Public domain",
    },
    {
      species: "Song Sparrow",
      photographer: "Grayson Smith",
      source: "U.S. Fish & Wildlife Service",
      url: "https://www.fws.gov/media/song-sparrow-1",
      license: "Public domain",
    },
    {
      species: "Tree Swallow",
      photographer: "Holly Keepers",
      source: "U.S. Fish & Wildlife Service",
      url: "https://www.fws.gov/media/tree-swallow-0",
      license: "Public domain",
    },
    {
      species: "Turkey Vulture",
      photographer: "Courtney Celley",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:Turkey_vulture_(54471196669).jpg",
      license: "Public domain",
    },
    {
      species: "White-breasted Nuthatch",
      photographer: "Gary Sonnenberg",
      license: "Photograph by Gary Sonnenberg",
    },
    {
      species: "White-throated Sparrow",
      photographer: "Courtney Celley",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:White-throated_sparrow_(54038068044).jpg",
      license: "Public domain",
    },
    {
      species: "Wild Turkey",
      photographer: "Courtney Celley",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:Wild_Turkey_Strutting_(48413776342).jpg",
      license: "Public domain",
    },
    {
      species: "Wood Duck",
      photographer: "Courtney Celley",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:Wood_duck_(53068651259).jpg",
      license: "Public domain",
    },
    {
      species: "Yellow Warbler",
      photographer: "Mike Budd",
      source: "Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:Yellow_warbler_(53769206400).jpg",
      license: "Public domain",
    },
  ];

  return (
    <main
      style={{
        maxWidth: "700px",
        margin: "0 auto",
        padding: "2rem",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <p style={{ marginBottom: "1.5rem" }}>
        <a
          href="/"
          style={{
            color: "#355c45",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          ← Backyard Bird Tracker
        </a>
      </p>

      <h1
        style={{
          fontSize: "2rem",
          marginBottom: "1rem",
        }}
      >
        Image Credits
      </h1>

      <p
        style={{
          lineHeight: 1.6,
          marginBottom: "2rem",
        }}
      >
        The bird images in Backyard Bird Tracker come from a combination of
        photographs by Gary Sonnenberg and public-domain or CC0 photographs from
        Wikimedia Commons and the U.S. Fish & Wildlife Service. Photographers
        and creators are credited here even when attribution is not legally
        required.
      </p>

      <div>
        {credits.map((credit) => (
          <div
            key={credit.species}
            style={{
              padding: "0.9rem 0",
              borderBottom: "1px solid #e5e3dd",
            }}
          >
            <div
              style={{
                fontWeight: 600,
                marginBottom: "0.25rem",
              }}
            >
              {credit.species}
            </div>

            <div
              style={{
                fontSize: "0.9rem",
                color: "#666",
                lineHeight: 1.5,
              }}
            >
              {credit.license === "Photograph by Gary Sonnenberg" ? (
                <>Photograph by Gary Sonnenberg</>
              ) : (
                <>
                  Photograph by {credit.photographer}
                  {" · "}
                  {credit.source && credit.url ? (
                    <a
                      href={credit.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#355c45",
                      }}
                    >
                      {credit.source}
                    </a>
                  ) : (
                    credit.source
                  )}
                  {" · "}
                  {credit.license}
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <p
        style={{
          marginTop: "2rem",
          fontSize: "0.85rem",
          color: "#666",
          lineHeight: 1.5,
        }}
      >
        Source pages are provided for reference and attribution. The licensing
        information shown here reflects the image sources selected for use in
        Backyard Bird Tracker.
      </p>
    </main>
  );
}

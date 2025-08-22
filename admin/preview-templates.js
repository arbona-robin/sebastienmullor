// Preview templates for Decap CMS using Tailwind CSS classes

// Simple markdown to HTML helper (fallback if marked is not available)
function markdownToHTML(content) {
  if (!content) return '';
  
  try {
    // Try to use marked if available
    if (typeof marked !== 'undefined' && marked.parse) {
      return marked.parse(content, { breaks: true, gfm: true });
    }
  } catch (error) {
    console.warn('Marked library failed, using fallback:', error);
  }
  
  // Robust fallback - convert markdown basics to HTML
  return content
    // Convert double line breaks to paragraph breaks
    .split('\n\n')
    .map(paragraph => paragraph.trim())
    .filter(paragraph => paragraph.length > 0)
    .map(p => {
      // Basic markdown formatting
      let html = p
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
        .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
        .replace(/\n/g, '<br>'); // Line breaks
      return `<p class="text-base max-md:text-sm max-sm:text-sm leading-relaxed text-gray-400 mb-6">${html}</p>`;
    })
    .join('\n');
}

// Index/Réalisations page preview
const IndexPreview = ({ entry, widgetFor, getAsset }) => {
  const data = entry.getIn(["data"]).toJS();
  const meta = data.meta || {};
  const hero = data.hero || {};
  const gallery = data.gallery || [];

  return h("div", { 
    className: "opacity-0 animate-[fadeIn_0.6s_ease-in-out_forwards] page-transition font-sans overflow-x-hidden bg-black text-white",
    style: { minHeight: "100vh" }
  }, [
    // Hero Section
    h("section", { className: "h-screen bg-black flex items-center justify-center relative" }, [
      h("div", { className: "flex flex-col items-center justify-center text-center" }, [
        h("div", { className: "mb-12 md:mb-8 sm:mb-6" }, [
          h("img", {
            src: "../assets/logo.png",
            alt: "Logo Sébastien Mullor",
            className: "max-w-3xl md:max-w-sm sm:max-w-72 sm:max-h-48 w-auto h-auto object-contain",
          }),
        ]),
        h("div", {}, [
          h(
            "a",
            {
              href: "#gallery",
              className: "inline-flex items-center gap-3 text-white no-underline font-light text-lg md:text-base sm:text-sm tracking-wider py-4 px-8 md:py-3 md:px-6 sm:py-3 sm:px-5 border-2 border-white/30 rounded-full bg-white/5 backdrop-blur-md transition-all duration-500 relative overflow-hidden hover:border-white/60 hover:bg-white/10 hover:transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/10 animate-[pulse_3s_infinite]",
            },
            [h("span", {}, hero.cta_text || "Découvrir les projets")]
          ),
        ]),
      ]),
    ]),

    // Gallery Section
    h(
      "section",
      { className: "w-full", id: "gallery" },
      gallery.map((item, index) =>
        h(
          "div",
          {
            key: index,
            className: "w-full block bg-black mb-0.5",
          },
          [
            h("img", {
              src: getAsset(item.image),
              alt: item.alt || `Bateau ${index + 1}`,
              className: "w-full h-auto block transition-transform duration-300 hover:scale-105",
            }),
          ]
        )
      )
    ),
  ]);
};

// Architecture page preview
const ArchitecturePreview = ({ entry, widgetFor, getAsset }) => {
  const data = entry.getIn(["data"]).toJS();
  const meta = data.meta || {};
  const intro = data.intro || {};
  const formation = data.formation || {};
  const philosophy = data.philosophy || {};
  const vision = data.vision || {};

  return h("div", { 
    className: "pt-20 min-h-screen bg-black opacity-0 animate-[fadeIn_0.6s_ease-in-out_forwards] page-transition font-sans overflow-x-hidden text-white",
    style: { minHeight: "100vh" }
  }, [
    // Intro Section
    h("section", { className: "py-24 max-md:py-16 max-sm:py-12 bg-black" }, [
      h("div", { className: "max-w-7xl mx-auto grid grid-cols-2 max-md:grid-cols-1 gap-16 max-lg:gap-12 max-md:gap-8 items-center px-8 max-lg:px-6 max-md:px-4 max-sm:px-2" }, [
        h("div", { className: "max-md:text-center" }, [
          h("h1", { className: "text-5xl max-md:text-4xl max-sm:text-3xl mb-2 max-md:mb-1 text-white font-light" }, intro.name || ""),
          h("h2", { className: "text-2xl max-md:text-xl max-sm:text-lg mb-8 max-md:mb-6 max-sm:mb-4 text-white font-normal" }, intro.role || ""),
          intro.content ? h("div", { 
            dangerouslySetInnerHTML: { 
              __html: markdownToHTML(intro.content)
            }
          }) : null,
          intro.quote ? h("div", { 
            className: "text-xl max-md:text-lg max-sm:text-base text-white font-medium mt-8 max-md:mt-6 max-sm:mt-4 p-6 max-md:p-4 max-sm:p-3 bg-white/10 border-l-4 border-white rounded-r-lg" 
          }, intro.quote) : null,
        ]),
        intro.image
          ? h("div", { className: "overflow-hidden max-md:order-first" }, [
              h("img", {
                src: getAsset(intro.image),
                alt: intro.name || "Photo de profil",
                className: "w-full h-auto rounded-lg shadow-lg transition-transform duration-300 hover:scale-105",
              }),
            ])
          : null,
      ]),
    ]),

    // Formation Section
    formation.content
      ? h("section", { className: "py-24 max-md:py-16 max-sm:py-12 bg-black" }, [
          h("div", { className: "max-w-4xl mx-auto px-8 max-lg:px-6 max-md:px-4 max-sm:px-2" }, [
            h("div", { className: "text-center" }, [
              h("h2", { className: "text-4xl max-md:text-3xl max-sm:text-2xl mb-8 max-md:mb-6 max-sm:mb-4 text-white font-light" }, "Formation"),
              h("div", { 
                dangerouslySetInnerHTML: { 
                  __html: markdownToHTML(formation.content)
                }
              }),
            ]),
          ]),
        ])
      : null,

    // Philosophy Section
    philosophy.content
      ? h("section", { className: "py-24 max-md:py-16 max-sm:py-12 bg-black" }, [
          h("div", { className: "max-w-4xl mx-auto px-8 max-lg:px-6 max-md:px-4 max-sm:px-2" }, [
            h("div", { className: "text-center" }, [
              h("h2", { className: "text-4xl max-md:text-3xl max-sm:text-2xl mb-8 max-md:mb-6 max-sm:mb-4 text-white font-light" }, "Philosophie"),
              h("div", { 
                dangerouslySetInnerHTML: { 
                  __html: markdownToHTML(philosophy.content)
                }
              }),
            ]),
          ]),
        ])
      : null,

    // Vision Section
    vision.content
      ? h("section", { className: "py-24 max-md:py-16 max-sm:py-12 bg-black" }, [
          h("div", { className: "max-w-4xl mx-auto px-8 max-lg:px-6 max-md:px-4 max-sm:px-2" }, [
            h("div", { className: "text-center" }, [
              h("h2", { className: "text-4xl max-md:text-3xl max-sm:text-2xl mb-8 max-md:mb-6 max-sm:mb-4 text-white font-light" }, "Vision"),
              h("div", { 
                dangerouslySetInnerHTML: { 
                  __html: markdownToHTML(vision.content)
                }
              }),
            ]),
          ]),
        ])
      : null,
  ]);
};

// Contact page preview
const ContactPreview = ({ entry, widgetFor, getAsset }) => {
  const data = entry.getIn(["data"]).toJS();
  const meta = data.meta || {};
  const address = data.address || {};
  const website = data.website || {};
  const projects = data.projects || {};
  const image = data.image || {};

  return h("div", { 
    className: "pt-20 min-h-screen bg-black opacity-0 animate-[fadeIn_0.6s_ease-in-out_forwards] contact-page page-transition font-sans overflow-x-hidden text-white",
    style: { minHeight: "100vh" }
  }, [
    h("section", { className: "h-[calc(100vh-5rem)] max-md:h-auto max-md:min-h-[calc(100vh-5rem)] flex items-stretch" }, [
      h("div", { className: "w-full grid grid-cols-2 max-md:grid-cols-1 h-full" }, [
        // Contact Info
        h("div", { className: "bg-black text-white p-16 max-lg:p-12 max-md:p-8 max-sm:p-6 max-md:min-h-[60vh] flex flex-col justify-center" }, [
          h("h1", { className: "text-5xl max-md:text-4xl max-sm:text-3xl mb-12 max-md:mb-8 max-sm:mb-6 font-light" }, "Contact"),

          h("div", { className: "mb-12" }, [
            // Address
            address.lines
              ? h("div", { className: "mb-10 max-md:mb-8 max-sm:mb-8" }, [
                  h("h2", { className: "text-xl max-md:text-lg mb-2 text-white font-normal" }, "Adresse"),
                  h("p", { 
                    className: "text-base max-md:text-sm max-sm:text-sm leading-relaxed text-gray-400",
                    dangerouslySetInnerHTML: { __html: address.lines.join("<br />") }
                  }),
                ])
              : null,

            // Phone
            data.phone
              ? h("div", { className: "mb-10 max-md:mb-8 max-sm:mb-8" }, [
                  h("h2", { className: "text-xl max-md:text-lg mb-2 text-white font-normal" }, "Téléphone"),
                  h("p", { className: "text-base max-md:text-sm max-sm:text-sm leading-relaxed text-gray-400" }, data.phone),
                ])
              : null,

            // Email
            data.email
              ? h("div", { className: "mb-10 max-md:mb-8 max-sm:mb-8" }, [
                  h("h2", { className: "text-xl max-md:text-lg mb-2 text-white font-normal" }, "Email"),
                  h("p", { className: "text-base max-md:text-sm max-sm:text-sm leading-relaxed text-gray-400" }, [
                    h("a", { 
                      href: `mailto:${data.email}`,
                      className: "text-white no-underline font-light tracking-wide transition-all duration-300 inline-block hover:text-white hover:no-underline hover:transform hover:-translate-y-0.5"
                    }, data.email),
                  ]),
                ])
              : null,

            // Website
            website.url
              ? h("div", { className: "mb-10 max-md:mb-8 max-sm:mb-8" }, [
                  h("h2", { className: "text-xl max-md:text-lg mb-2 text-white font-normal" }, "Site Web"),
                  h("p", { className: "text-base max-md:text-sm max-sm:text-sm leading-relaxed text-gray-400" }, [
                    h(
                      "a",
                      {
                        href: website.url,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "text-white no-underline font-light tracking-wide transition-all duration-300 inline-block hover:text-white hover:no-underline hover:transform hover:-translate-y-0.5"
                      },
                      website.label || website.url
                    ),
                  ]),
                ])
              : null,
          ]),

          // Projects section
          projects.title
            ? h("div", {}, [
                h("h2", { className: "text-xl max-md:text-lg mb-2 text-white font-normal" }, projects.title),
                h("p", { className: "text-base max-md:text-sm max-sm:text-sm text-gray-400 leading-relaxed" }, projects.text || ""),
              ])
            : null,
        ]),

        // Contact Image
        image.path
          ? h("div", { className: "overflow-hidden max-md:min-h-[40vh]" }, [
              h("img", {
                src: getAsset(image.path),
                alt: image.alt || "Atelier Architecture Navale",
                className: "w-full h-full object-cover object-center",
              }),
            ])
          : null,
      ]),
    ]),
  ]);
};

// Register all preview templates
CMS.registerPreviewTemplate("index", IndexPreview);
CMS.registerPreviewTemplate("architecture", ArchitecturePreview);
CMS.registerPreviewTemplate("contact", ContactPreview);
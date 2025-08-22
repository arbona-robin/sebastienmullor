// Preview templates for Decap CMS using your existing website structure

// Index/Réalisations page preview
const IndexPreview = ({ entry, widgetFor, getAsset }) => {
  const data = entry.getIn(["data"]).toJS();
  const meta = data.meta || {};
  const hero = data.hero || {};
  const gallery = data.gallery || [];

  return h("div", { className: "page-transition" }, [
    // Hero Section
    h("section", { className: "hero-section" }, [
      h("div", { className: "hero-content" }, [
        h("div", { className: "hero-logo" }, [
          h("img", {
            src: "../assets/logo.png",
            alt: "Logo Sébastien Mullor",
            style: { maxWidth: "400px", height: "auto" },
          }),
        ]),
        h("div", { className: "hero-cta" }, [
          h(
            "a",
            {
              href: "#gallery",
              className: "cta-button",
            },
            [h("span", {}, hero.cta_text || "Découvrir mes réalisations")]
          ),
        ]),
      ]),
    ]),

    // Gallery Section
    h(
      "section",
      { className: "gallery", id: "gallery" },
      gallery.map((item, index) =>
        h(
          "div",
          {
            key: index,
            className: "gallery-item",
          },
          [
            h("img", {
              src: getAsset(item.image),
              alt: item.alt || "",
              style: { width: "100%", height: "auto", display: "block" },
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

  return h("div", { className: "architecture-page page-transition" }, [
    // Intro Section
    h("section", { className: "intro-section" }, [
      h("div", { className: "intro-container" }, [
        h("div", { className: "intro-text" }, [
          h("h1", {}, intro.name || ""),
          h("h2", {}, intro.role || ""),
          intro.content ? h("div", { 
            dangerouslySetInnerHTML: { 
              __html: marked(intro.content, { breaks: true, gfm: true })
            }
          }) : null,
          intro.quote ? h("div", { className: "quote" }, intro.quote) : null,
        ]),
        intro.image
          ? h("div", { className: "intro-image" }, [
              h("img", {
                src: getAsset(intro.image),
                alt: intro.name || "Photo de profil",
                style: { width: "100%", height: "auto", borderRadius: "10px" },
              }),
            ])
          : null,
      ]),
    ]),

    // Formation Section
    formation.content
      ? h("section", { className: "full-text-section" }, [
          h("div", { className: "container" }, [
            h("div", { className: "text-content" }, [
              h("h2", {}, "Formation"),
              h("div", { 
                dangerouslySetInnerHTML: { 
                  __html: marked(formation.content, { breaks: true, gfm: true })
                }
              }),
            ]),
          ]),
        ])
      : null,

    // Philosophy Section
    philosophy.content
      ? h("section", { className: "full-text-section" }, [
          h("div", { className: "container" }, [
            h("div", { className: "text-content" }, [
              h("h2", {}, "Philosophie"),
              h("div", { 
                dangerouslySetInnerHTML: { 
                  __html: marked(philosophy.content, { breaks: true, gfm: true })
                }
              }),
            ]),
          ]),
        ])
      : null,

    // Vision Section
    vision.content
      ? h("section", { className: "full-text-section" }, [
          h("div", { className: "container" }, [
            h("div", { className: "text-content" }, [
              h("h2", {}, "Vision"),
              h("div", { 
                dangerouslySetInnerHTML: { 
                  __html: marked(vision.content, { breaks: true, gfm: true })
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

  return h("div", { className: "contact-page page-transition" }, [
    h("section", { className: "contact-section" }, [
      h("div", { className: "contact-container" }, [
        // Contact Info
        h("div", { className: "contact-info" }, [
          h("h1", {}, "Contact"),

          h("div", { className: "contact-details" }, [
            // Address
            address.lines
              ? h("div", { className: "contact-item" }, [
                  h("h2", {}, "Adresse"),
                  h("p", {}, address.lines.join("\n")),
                ])
              : null,

            // Phone
            data.phone
              ? h("div", { className: "contact-item" }, [
                  h("h2", {}, "Téléphone"),
                  h("p", {}, [
                    h("a", { href: `tel:${data.phone}` }, data.phone),
                  ]),
                ])
              : null,

            // Email
            data.email
              ? h("div", { className: "contact-item" }, [
                  h("h2", {}, "Email"),
                  h("p", {}, [
                    h("a", { href: `mailto:${data.email}` }, data.email),
                  ]),
                ])
              : null,

            // Website
            website.url
              ? h("div", { className: "contact-item" }, [
                  h("h2", {}, "Site Web"),
                  h("p", {}, [
                    h(
                      "a",
                      {
                        href: website.url,
                        target: "_blank",
                        rel: "noopener noreferrer",
                      },
                      website.label || website.url
                    ),
                  ]),
                ])
              : null,
          ]),

          // Projects section
          projects.title
            ? h("div", { className: "contact-social" }, [
                h("h2", {}, projects.title),
                h("p", {}, projects.text || ""),
              ])
            : null,
        ]),

        // Contact Image
        image.path
          ? h("div", { className: "contact-image" }, [
              h("img", {
                src: getAsset(image.path),
                alt: image.alt || "Image de contact",
                style: { width: "100%", height: "100%", objectFit: "cover" },
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

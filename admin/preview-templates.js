// Preview templates for Decap CMS using Tailwind CSS classes

console.log("Preview templates script loaded");

// Use the global h function provided by Decap CMS, or React.createElement as fallback
const h = window.h || (window.React && window.React.createElement) || function(tag, props, ...children) {
  console.error("No h function available");
  return null;
};

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
  try {
    const data = entry.getIn(["data"]).toJS();
    const meta = data.meta || {};
    const hero = data.hero || {};
    const gallery = data.gallery || [];

  return h("div", { 
    className: "font-sans overflow-x-hidden bg-black text-white",
    style: { 
      minHeight: "100vh", 
      backgroundColor: "#000", 
      color: "#fff",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      overflowX: "hidden"
    }
  }, [
    // Hero Section
    h("section", { 
      className: "h-screen bg-black flex items-center justify-center relative",
      style: {
        height: "100vh",
        backgroundColor: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
      }
    }, [
      h("div", { 
        className: "flex flex-col items-center justify-center text-center",
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center"
        }
      }, [
        h("div", { 
          className: "mb-12 md:mb-8 sm:mb-6",
          style: { marginBottom: "3rem" }
        }, [
          h("img", {
            src: "../assets/logo.png",
            alt: "Logo Sébastien Mullor",
            className: "max-w-3xl md:max-w-sm sm:max-w-72 sm:max-h-48 w-auto h-auto object-contain",
            style: {
              maxWidth: "48rem",
              width: "auto",
              height: "auto",
              objectFit: "contain"
            }
          }),
        ]),
        h("div", {}, [
          h(
            "a",
            {
              href: "#gallery",
              className: "inline-flex items-center gap-3 text-white no-underline font-light text-lg md:text-base sm:text-sm tracking-wider py-4 px-8 md:py-3 md:px-6 sm:py-3 sm:px-5 border-2 border-white/30 rounded-full bg-white/5 backdrop-blur-md transition-all duration-500 relative overflow-hidden hover:border-white/60 hover:bg-white/10 hover:transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/10 animate-pulse",
              style: {
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                color: "#fff",
                textDecoration: "none",
                fontWeight: "300",
                fontSize: "1.125rem",
                letterSpacing: "0.05em",
                padding: "1rem 2rem",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "50px",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                transition: "all 0.5s ease"
              }
            },
            [h("span", {}, hero.cta_text || "Découvrir les projets")]
          ),
        ]),
      ]),
    ]),

    // Gallery Section
    h(
      "section",
      { 
        className: "w-full", 
        id: "gallery",
        style: { width: "100%" }
      },
      gallery.map((item, index) =>
        h(
          "div",
          {
            key: index,
            className: "w-full block bg-black mb-0.5",
            style: {
              width: "100%",
              display: "block",
              backgroundColor: "#000",
              marginBottom: "2px"
            }
          },
          [
            h("img", {
              src: getAsset(item.image),
              alt: item.alt || `Bateau ${index + 1}`,
              className: "w-full h-auto block transition-transform duration-300 hover:scale-105",
              style: {
                width: "100%",
                height: "auto",
                display: "block",
                transition: "transform 0.3s ease"
              }
            }),
          ]
        )
      )
    ),
  ]);
  } catch (error) {
    console.error("IndexPreview error:", error);
    return h("div", { style: { color: "red", padding: "20px" } }, `Preview Error: ${error.message}`);
  }
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
    className: "pt-20 min-h-screen bg-black animate-fade-in font-sans overflow-x-hidden text-white",
    style: { 
      paddingTop: "5rem",
      minHeight: "100vh",
      backgroundColor: "#000",
      color: "#fff",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      overflowX: "hidden"
    }
  }, [
    // Intro Section
    h("section", { 
      className: "py-24 max-md:py-16 max-sm:py-12 bg-black",
      style: {
        padding: "6rem 0",
        backgroundColor: "#000"
      }
    }, [
      h("div", { 
        className: "max-w-7xl mx-auto grid grid-cols-2 max-md:grid-cols-1 gap-16 max-lg:gap-12 max-md:gap-8 items-center px-8 max-lg:px-6 max-md:px-4 max-sm:px-2",
        style: {
          maxWidth: "80rem",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "center",
          padding: "0 2rem"
        }
      }, [
        h("div", { 
          className: "max-md:text-center",
          style: { textAlign: "left" }
        }, [
          h("h1", { 
            className: "text-5xl max-md:text-4xl max-sm:text-3xl mb-2 max-md:mb-1 text-white font-light",
            style: {
              fontSize: "3rem",
              marginBottom: "0.5rem",
              color: "#fff",
              fontWeight: "300"
            }
          }, intro.name || ""),
          h("h2", { 
            className: "text-2xl max-md:text-xl max-sm:text-lg mb-8 max-md:mb-6 max-sm:mb-4 text-white font-normal",
            style: {
              fontSize: "1.5rem",
              marginBottom: "2rem",
              color: "#fff",
              fontWeight: "400"
            }
          }, intro.role || ""),
          intro.content ? h("div", { 
            className: "text-lg max-md:text-base mb-6 text-gray-300 leading-relaxed",
            style: {
              fontSize: "1.125rem",
              marginBottom: "1.5rem",
              color: "#d1d5db",
              lineHeight: "1.75"
            },
            dangerouslySetInnerHTML: { 
              __html: markdownToHTML(intro.content)
            }
          }) : null,
          intro.quote ? h("p", { 
            className: "text-xl max-md:text-lg max-sm:text-base text-white font-medium mt-8 max-md:mt-6 p-6 max-md:p-4 max-sm:p-3 bg-white/10 border-l-4 border-white rounded-r-lg quote",
            style: {
              fontSize: "1.25rem",
              color: "#fff",
              fontWeight: "500",
              marginTop: "2rem",
              padding: "1.5rem",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderLeft: "4px solid #fff",
              borderRadius: "0 8px 8px 0"
            }
          }, h("em", {}, intro.quote)) : null,
        ]),
        intro.image
          ? h("div", { 
            className: "overflow-hidden max-md:order-first",
            style: { overflow: "hidden" }
          }, [
              h("img", {
                src: getAsset(intro.image),
                alt: intro.name || "Architecture Navale",
                className: "w-full h-auto rounded-lg shadow-xl transition-transform duration-300 hover:scale-[1.02]",
                style: {
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  transition: "transform 0.3s ease"
                }
              }),
            ])
          : null,
      ]),
    ]),

    // Full Text Section combining all content
    (formation.content || philosophy.content || vision.content)
      ? h("section", { 
          className: "py-24 max-md:py-12 bg-black",
          style: {
            padding: "6rem 0 6rem 0",
            backgroundColor: "#000"
          }
        }, [
          h("div", { 
            className: "max-w-4xl mx-auto px-8 max-md:px-4",
            style: {
              maxWidth: "56rem",
              margin: "0 auto",
              padding: "0 2rem"
            }
          }, [
            h("div", {}, [
              // Formation Section
              formation.content ? [
                h("h2", { 
                  className: "text-4xl max-md:text-3xl max-sm:text-2xl mb-8 max-md:mb-6 text-white font-light text-center",
                  style: {
                    fontSize: "2.25rem",
                    marginBottom: "2rem",
                    color: "#fff",
                    fontWeight: "300",
                    textAlign: "center"
                  }
                }, "Formation & Expérience"),
                h("div", { 
                  className: "text-lg max-md:text-base leading-relaxed mb-6 text-gray-300 text-justify",
                  style: {
                    fontSize: "1.125rem",
                    lineHeight: "1.75",
                    marginBottom: "1.5rem",
                    color: "#d1d5db",
                    textAlign: "justify"
                  },
                  dangerouslySetInnerHTML: { 
                    __html: markdownToHTML(formation.content)
                  }
                })
              ] : null,

              // Philosophy Section
              philosophy.content ? [
                h("h3", { 
                  className: "text-xl max-md:text-lg my-12 max-md:my-8 max-md:mb-4 text-white font-normal",
                  style: {
                    fontSize: "1.25rem",
                    margin: "3rem 0 1rem 0",
                    color: "#fff",
                    fontWeight: "400"
                  }
                }, "Ma Philosophie de Conception"),
                h("div", { 
                  className: "text-lg max-md:text-base leading-relaxed mb-6 text-gray-300 text-justify",
                  style: {
                    fontSize: "1.125rem",
                    lineHeight: "1.75",
                    marginBottom: "1.5rem",
                    color: "#d1d5db",
                    textAlign: "justify"
                  },
                  dangerouslySetInnerHTML: { 
                    __html: markdownToHTML(philosophy.content)
                  }
                })
              ] : null,

              // Vision Section
              vision.content ? [
                h("h3", { 
                  className: "text-xl max-md:text-lg my-12 max-md:my-8 max-md:mb-4 text-white font-normal",
                  style: {
                    fontSize: "1.25rem",
                    margin: "3rem 0 1rem 0",
                    color: "#fff",
                    fontWeight: "400"
                  }
                }, "Ma Vision"),
                h("div", { 
                  className: "text-lg max-md:text-base leading-relaxed mb-6 text-gray-300 text-justify",
                  style: {
                    fontSize: "1.125rem",
                    lineHeight: "1.75",
                    marginBottom: "1.5rem",
                    color: "#d1d5db",
                    textAlign: "justify"
                  },
                  dangerouslySetInnerHTML: { 
                    __html: markdownToHTML(vision.content)
                  }
                })
              ] : null,
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
    className: "pt-20 min-h-screen bg-black animate-fade-in font-sans overflow-x-hidden text-white",
    style: { 
      paddingTop: "5rem",
      minHeight: "100vh",
      backgroundColor: "#000",
      color: "#fff",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      overflowX: "hidden"
    }
  }, [
    h("section", { 
      className: "h-[calc(100vh-5rem)] max-md:h-auto max-md:min-h-[calc(100vh-5rem)] flex items-stretch",
      style: {
        height: "calc(100vh - 5rem)",
        display: "flex",
        alignItems: "stretch"
      }
    }, [
      h("div", { 
        className: "w-full grid grid-cols-2 max-md:grid-cols-1 h-full",
        style: {
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          height: "100%"
        }
      }, [
        // Contact Info
        h("div", { 
          className: "bg-black text-white p-16 max-lg:p-12 max-md:p-8 max-sm:p-6 max-md:min-h-[60vh] flex flex-col justify-center",
          style: {
            backgroundColor: "#000",
            color: "#fff",
            padding: "4rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }
        }, [
          h("h1", { 
            className: "text-5xl max-md:text-4xl max-sm:text-3xl mb-12 max-md:mb-8 max-sm:mb-6 font-light",
            style: {
              fontSize: "3rem",
              marginBottom: "3rem",
              fontWeight: "300",
              color: "#fff"
            }
          }, "Contact"),

          h("div", { 
            className: "mb-12",
            style: { marginBottom: "3rem" }
          }, [
            // Address
            address.lines
              ? h("div", { 
                  className: "mb-10 max-md:mb-8 max-sm:mb-8",
                  style: { marginBottom: "2.5rem" }
                }, [
                  h("h2", { 
                    className: "text-xl max-md:text-lg mb-2 text-white font-normal",
                    style: {
                      fontSize: "1.25rem",
                      marginBottom: "0.5rem",
                      color: "#fff",
                      fontWeight: "400"
                    }
                  }, "Adresse"),
                  h("p", { 
                    className: "text-base max-md:text-sm max-sm:text-sm leading-relaxed text-gray-400",
                    style: {
                      fontSize: "1rem",
                      lineHeight: "1.75",
                      color: "#9ca3af"
                    },
                    dangerouslySetInnerHTML: { __html: address.lines.join("<br />") }
                  }),
                ])
              : null,

            // Phone
            data.phone
              ? h("div", { 
                  className: "mb-10 max-md:mb-8 max-sm:mb-8",
                  style: { marginBottom: "2.5rem" }
                }, [
                  h("h2", { 
                    className: "text-xl max-md:text-lg mb-2 text-white font-normal",
                    style: {
                      fontSize: "1.25rem",
                      marginBottom: "0.5rem",
                      color: "#fff",
                      fontWeight: "400"
                    }
                  }, "Téléphone"),
                  h("p", { 
                    className: "text-base max-md:text-sm max-sm:text-sm leading-relaxed text-gray-400",
                    style: {
                      fontSize: "1rem",
                      lineHeight: "1.75",
                      color: "#9ca3af"
                    }
                  }, data.phone),
                ])
              : null,

            // Email
            data.email
              ? h("div", { 
                  className: "mb-10 max-md:mb-8 max-sm:mb-8",
                  style: { marginBottom: "2.5rem" }
                }, [
                  h("h2", { 
                    className: "text-xl max-md:text-lg mb-2 text-white font-normal",
                    style: {
                      fontSize: "1.25rem",
                      marginBottom: "0.5rem",
                      color: "#fff",
                      fontWeight: "400"
                    }
                  }, "Email"),
                  h("p", { 
                    className: "text-base max-md:text-sm max-sm:text-sm leading-relaxed text-gray-400",
                    style: {
                      fontSize: "1rem",
                      lineHeight: "1.75",
                      color: "#9ca3af"
                    }
                  }, [
                    h("a", { 
                      href: `mailto:${data.email}`,
                      className: "text-white no-underline font-light tracking-wide transition-all duration-300 inline-block hover:text-white hover:no-underline hover:transform hover:-translate-y-0.5",
                      style: {
                        color: "#fff",
                        textDecoration: "none",
                        fontWeight: "300",
                        letterSpacing: "0.025em",
                        transition: "all 0.3s ease",
                        display: "inline-block"
                      }
                    }, data.email),
                  ]),
                ])
              : null,

            // Website
            website.url
              ? h("div", { 
                  className: "mb-10 max-md:mb-8 max-sm:mb-8",
                  style: { marginBottom: "2.5rem" }
                }, [
                  h("h2", { 
                    className: "text-xl max-md:text-lg mb-2 text-white font-normal",
                    style: {
                      fontSize: "1.25rem",
                      marginBottom: "0.5rem",
                      color: "#fff",
                      fontWeight: "400"
                    }
                  }, "Site Web"),
                  h("p", { 
                    className: "text-base max-md:text-sm max-sm:text-sm leading-relaxed text-gray-400",
                    style: {
                      fontSize: "1rem",
                      lineHeight: "1.75",
                      color: "#9ca3af"
                    }
                  }, [
                    h(
                      "a",
                      {
                        href: website.url,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "text-white no-underline font-light tracking-wide transition-all duration-300 inline-block hover:text-white hover:no-underline hover:transform hover:-translate-y-0.5",
                        style: {
                          color: "#fff",
                          textDecoration: "none",
                          fontWeight: "300",
                          letterSpacing: "0.025em",
                          transition: "all 0.3s ease",
                          display: "inline-block"
                        }
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
                h("h2", { 
                  className: "text-xl max-md:text-lg mb-2 text-white font-normal",
                  style: {
                    fontSize: "1.25rem",
                    marginBottom: "0.5rem",
                    color: "#fff",
                    fontWeight: "400"
                  }
                }, projects.title),
                h("p", { 
                  className: "text-base max-md:text-sm max-sm:text-sm text-gray-400 leading-relaxed",
                  style: {
                    fontSize: "1rem",
                    color: "#9ca3af",
                    lineHeight: "1.75"
                  }
                }, projects.text || ""),
              ])
            : null,
        ]),

        // Contact Image
        image.path
          ? h("div", { 
              className: "overflow-hidden max-md:min-h-[40vh]",
              style: {
                overflow: "hidden",
                minHeight: "40vh"
              }
            }, [
              h("img", {
                src: getAsset(image.path),
                alt: image.alt || "Atelier Architecture Navale",
                className: "w-full h-full object-cover object-center",
                style: {
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center"
                }
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
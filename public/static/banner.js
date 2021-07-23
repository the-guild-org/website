/**
 * @param {String} HTML representing any number of sibling elements
 * @return {NodeList} 
 */
 function htmlToElements(html) {
  var template = document.createElement('template');
  template.innerHTML = html;
  return template.content;
}

function main() {
  const logoUrl = "https://the-guild.dev/static/logo.png";
  const linkUrl = "https://the-guild.dev";
  const title = "The Guild - Open Source";
  const docusaurusId = "__docusaurus";

  if (document.getElementById(docusaurusId)) {
    init();
  } else {
    window.addEventListener("load", init);
  }
  
  var isModalBound = false;

  /**
   * Toggle the OSS modal
   */
   function toggleModal() {

    // Get the modal
    var modal = document.getElementById("ossModal");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("g-close")[0];

    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }

  function bindModal() {
    // Get the button that opens the modal
    var btn = document.getElementById("oss-nav");

    // When the user clicks the button, open the modal 
    btn.onclick = function() {
      toggleModal();
    }
  }

  function init() {

    const guildHeader = htmlToElements(`
      <style type="text/css">
        #g-header-bar {
          background-color: var(--ifm-navbar-background-color)
          color: var(--ifm-navbar-link-color);
          width: 100%;
          height: 55px;
          padding-left: 16px;
          padding-right: 16px;
          padding-bottom: 5px;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .g-header-links {
          margin-right: 10px;
          color: var(--ifm-navbar-link-color);
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
        }

        /* The Modal (background) */
        .g-modal {
          display: none; /* Hidden by default */
          position: fixed; /* Stay in place */
          z-index: 10000; /* Sit on top */
          padding-top: 100px; /* Location of the box */
          left: 0;
          top: 0;
          width: 100%; /* Full width */
          height: 100%; /* Full height */
          overflow: auto; /* Enable scroll if needed */
          background-color: rgb(0,0,0); /* Fallback color */
          background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
        }

        /* Modal Content */
        .g-modal-content {
          background-color: var(--ifm-navbar-background-color);
          margin: auto;
          padding: 20px;
          border: 1px solid #888;
          width: 80%;
        }

        /* The Close Button */
        .g-close {
          color: #aaaaaa;
          float: right;
          font-size: 28px;
          font-weight: bold;
        }

        .g-close:hover,
        .g-close:focus {
          color: #000;
          text-decoration: none;
          cursor: pointer;
        }

        .productTable h4 {        
          margin-bottom: 0px;
          padding-bottom: 0px;
        }

        #oss-nav {
          cursor: pointer;
        }

        .ossCells {
          float: left;
          padding: 11px;
          margin-right: 5px;
          background-color: white;
        }

        .ossContentCells {
          float: left;
          width: 325px;
          padding-left: 5px;
        }

        :root {
          --logo-bg: url("${linkUrl}/static/white-logo.png") no-repeat;
          --logo-bg: url("${linkUrl}/static/logo.svg") no-repeat;
        }

        [data-theme="dark"] {
          --logo-bg: url("${linkUrl}/static/white-logo.png") no-repeat;
        }

        .g-header-logo {
          height: 45px;
          background: var(--logo-bg);
          width: 100px;
        }

        .g-modal-content {
          width: 1000px;
        }

        .productTable {
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          font-size: 15px;
          text-align: left;
          flex-wrap: wrap;
        }

        .flex-item-left {
          box-sizing: border-box;
          padding: 10px;
          flex: 50%;
        }

        .flex-item-right {
          box-sizing: border-box;
          padding: 10px;
          flex: 50%;
        }

        /* Responsive layout - makes a one column-layout instead of two-column layout */
        @media (max-width: 800px) {

          .g-modal-content {
            max-width: 95vw;
            margin: auto;
          }

          .flex-container {
            box-sizing: border-box;
            flex-direction: column;
          }

          .ossContentCells {
            width: 270px;
          }
        }
      </style>

      <!-- The Modal -->
      <div id="ossModal" class="g-modal">

        <!-- Modal content -->
        <div class="g-modal-content">
          <span class="g-close">&times;</span>
          <h3>Featured Products</h3>
          <hr />

          <!--<h3>GraphQL Products</h3>-->

          <div class="productTable" align="center">
            <div class="flex-item-left">
              <div class="ossCells">
                <img src="https://graphql-code-generator.com/img/gql-codegen-cover.png" width="100">
              </div>
              <div class="ossContentCells">
                <a href="https://graphql-code-generator.com/" target="_blank">
                  <h4>Code Generator</h4>
                </a>
                Generate code from GraphQL and operations
              </div>
            </div>

            <div class="flex-item-right">
              <div class="ossCells">
              <img src="${linkUrl}/img/logos/tools.svg" width="100">
              </div>
              <div class="ossContentCells">
                <a href="https://graphql-tools.com/" target="_blank">
                  <h4>GraphQL Tools</h4>
                </a>
                <p>A set of utilities to build your JavaScript GraphQL schema in a concise and powerful way.</p>
              </div>
            </div>

            <div class="flex-item-left">
              <div class="ossCells">
                <img src="${linkUrl}/img/logos/modules.svg" width="100">
              </div>
              <div class="ossContentCells">
                <a href="https://graphql-modules.com/" target="_blank">
                  <h4>GraphQL Modules</h4>
                </a>
                GraphQL Modules lets you separate your backend implementation to small, reusable, easy-to-implement and easy-to-test pieces.
              </div>
            </div>

            <div class="flex-item-right">
              <div class="ossCells">
                <img src="${linkUrl}/img/logos/scalars.svg" width="100">
              </div>
              <div class="ossContentCells">
                <a href="https://www.graphql-scalars.dev/" target="_blank">
                  <h4>GraphQL Scalars</h4>
                </a>
                A library of custom GraphQL Scalars for creating precise type-safe GraphQL schemas.
              </div>
            </div>

            <div class="flex-item-left">
              <div class="ossCells">
                <img src="https://graphql-mesh.com/img/mesh-text-logo.svg" width="100">
              </div>
              <div class="ossContentCells">
                <a href="https://graphql-mesh.com/" target="_blank">
                  <h4>GraphQL Mesh</h4>
                </a>
                GraphQL Mesh allows you to use GraphQL query language to access data in remote APIs that don't run GraphQL (and also ones that do run GraphQL).
              </div>
            </div>

            <div class="flex-item-right">
              <div class="ossCells">
                <img src="${linkUrl}/img/logos/apollo-angular.svg" width="100">
              </div>
              <div class="ossContentCells">
                <a href="https://apollo-angular.com/" target="_blank">
                  <h4>Apollo Angular</h4>
                </a>
                A fully-featured, production ready caching GraphQL client for Angular and every GraphQL server.
              </div>
            </div>

            <div class="flex-item-left">
              <div class="ossCells">
                <img src="${linkUrl}/img/logos/cli.svg" width="100">
              </div>
              <div class="ossContentCells">
                <a href="https://graphql-cli.com/" target="_blank">
                  <h4>GraphQL CLI</h4>
                </a>
                Command line tool for common GraphQL development workflows
              </div>
            </div>

            <div class="flex-item-right">
              <div class="ossCells">
                <img src="${linkUrl}/img/logos/config.svg" width="100">
              </div>
              <div class="ossContentCells">
                <a href="https://graphql-config.com/" target="_blank">
                  <h4>GraphQL Config</h4>
                </a>
                One configuration for all your GraphQL tools
              </div>
            </div>

            <div class="flex-item-left">
              <div class="ossCells">
                <img src="${linkUrl}/img/logos/sofa.svg" width="100">
              </div>
              <div class="ossContentCells">
                <a href="https://www.sofa-api.com/" target="_blank">
                  <h4>GraphQL SOFA</h4>
                </a>
                Generate RESTful APIs from your GraphQL Server
              </div>
            </div>

            <div class="flex-item-right">
              <div class="ossCells">
                <img src="${linkUrl}/img/logos/stencil-apollo.svg" width="100">
              </div>
              <div class="ossContentCells">
                <a href="https://github.com/ardatan/stencil-apollo" target="_blank">
                  <h4>Apollo Stencil</h4>
                </a>
                Stencil-Apollo lets you easily use GraphQL in Web Components.
              </div>
            </div>


            <div class="flex-item-left">
              <div class="ossCells">
                <img src="https://raw.githubusercontent.com/dotansimha/graphql-eslint/master/logo.png" width="100">
              </div>
              <div class="ossContentCells">
                <a href="https://github.com/dotansimha/graphql-eslint/" target="_blank">
                  <h4>GraphQL ESLint</h4>
                </a>
                GraphQL-ESLint integrates GraphQL AST in the ESLint core (as a parser).
              </div>
            </div>

            <div class="flex-item-right">
              <div class="ossCells">
                <img src="https://graphql-inspector.com/img/logo.svg" width="100">
              </div>
              <div class="ossContentCells">
                <a href="https://graphql-inspector.com/" target="_blank">
                  <h4>GraphQL Inspector</h4>
                </a>
                GraphQL Inspector is a set of tools to help you better maintain and improve GraphQL API as well as GraphQL consumers.
              </div>
            </div>


            <div class="flex-item-left">
              <div class="ossCells">
                <img src="${linkUrl}/img/logos/whats-app.svg" width="100">
              </div>
              <div class="ossContentCells">
                <a href="https://github.com/Urigo/WhatsApp-Clone-Tutorial" target="_blank">
                  <h4>Whatsapp Clone Tutorial</h4>
                </a>
                An open-source full-stack example app.
              </div>
            </div>

            <!--<div class="flex-item-right">
              <div class="ossCells">
                <img src="https://graphql-inspector.com/img/logo.svg" width="100">
              </div>
              <div class="ossContentCells">
                <a href="https://graphql-inspector.com/" target="_blank">
                  <h4>GraphQL Inspector</h4>
                </a>
                GraphQL Inspector is a set of tools to help you better maintain and improve GraphQL API as well as GraphQL consumers.
              </div>
            </div>-->


          </div>

        </div>

      </div>


      <div id="g-header-bar">
        <a href="${linkUrl}" title="The Guild - Open Source">
          <div class="g-header-logo"></div>
          <!--<picture>
            <source srcset="${linkUrl}/static/white-logo.png" media="(prefers-color-scheme: dark)" />
            <source srcset="${linkUrl}/static/logo.svg" media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)" />
            <img src="${linkUrl}/static/logo.svg" alt="The Guild Logo"/>
          </picture>-->
        </a>
        <div>
          <a href="${linkUrl}/services" class="g-header-links">Our Services</a>
          <a id="oss-nav" class="g-header-links">
            Open Source
            <img src="${linkUrl}/static/go-down.svg" height="10" width="12" style="color:black;" />
          </a>
          <!--<a href="${linkUrl}/open-source" class="g-header-links">Products</a>-->
          <a href="${linkUrl}/blog" class="g-header-links">Blog</a>
          <a href="${linkUrl}/about-us" class="g-header-links">Company</a>
        </div>
      </div>
    `);

    document.body.prepend(guildHeader);
    bindModal();
  }

  const HOST_TO_SEGMENTS = {
    'graphql-code-generator.com': ['codegen'],
    'graphql-modules.com': ['modules'],
    'graphql-tools.com': ['tools'],
    'the-guild.dev': ['guild-website'],
    'graphql-inspector.com': ['inspector'],
    'tortilla.academy': ['tortilla'],
    'graphql-mesh.com': ['mesh'],
    'apollo-angular.com': ['angular'],
    'graphql-cli.com': ['cli'],
    'graphql-scalars.dev': ['scalars']
  };

  if (typeof window !== 'undefined') {
    window.$crisp = []; window.CRISP_WEBSITE_ID = "af9adec5-ddfa-4db9-a4a3-25769daf2fc2"; (function () { d = document; s = d.createElement("script"); s.src = "https://client.crisp.chat/l.js"; s.async = 1; d.getElementsByTagName("head")[0].appendChild(s); })();

    if (HOST_TO_SEGMENTS[window.location.host]) {
      window.$crisp.push(["set", "session:segments", [HOST_TO_SEGMENTS[window.location.host]]])
    }
  }

}

main();

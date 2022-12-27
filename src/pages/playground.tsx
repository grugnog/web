import { AppConfig } from '@app/configs'
import { metaSetter } from '@app/utils'

import Head from 'next/head'
import Link from 'next/link'
import Script from 'next/script'

function Playground() {
  return (
    <div>
      <Head>
        <style>
          {`
    
    #main-content {
      height: 100%;
    }
    
    body {
      font-family: 'Open Sans', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: rgba(0,0,0,.8);
      line-height: 1.5;
      height: 100vh;
      letter-spacing: 0.53px;
      margin-right: -1px !important;
      margin: 0;
      overflow: hidden;
    }
    
    html, body, p, a, h1, h2, h3, h4, ul, pre, code {
      margin: 0;
      padding: 0;
      color: inherit;
    }
    
    a:active, a:focus, button:focus, input:focus {
      outline: none;
    }
    
    input, button, submit {
      border: none;
    }
    
    input, button, pre {
      font-family: 'Open Sans', sans-serif;
    }
    
    code {
      font-family: Consolas, monospace;
    }
        
    .playgroundIn {
        -webkit-animation: playgroundIn 0.5s ease-out forwards;
        animation: playgroundIn 0.5s ease-out forwards;
      }
  
      @-webkit-keyframes playgroundIn {
        from {
          opacity: 0;
          -webkit-transform: translateY(10px);
          -ms-transform: translateY(10px);
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          -webkit-transform: translateY(0);
          -ms-transform: translateY(0);
          transform: translateY(0);
        }
      }
  
      @keyframes playgroundIn {
        from {
          opacity: 0;
          -webkit-transform: translateY(10px);
          -ms-transform: translateY(10px);
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          -webkit-transform: translateY(0);
          -ms-transform: translateY(0);
          transform: translateY(0);
        }
      }

    #loading-wrapper {
      position: absolute;
      width: 100vw;
      height: 100vh;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -webkit-justify-content: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
    }

    .logo {
      width: 75px;
      height: 75px;
      margin-bottom: 20px;
      opacity: 0;
      -webkit-animation: fadeIn 0.5s ease-out forwards;
      animation: fadeIn 0.5s ease-out forwards;
    }

    @media only screen and (max-width: 800px) {
      .hrcFBJ {
        font-size: 12px !important;
      }
      .hrcFBJ > * {
        width: 60px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
      }
    }

    .text {
      font-size: 32px;
      font-weight: 200;
      text-align: center;
      color: rgba(255, 255, 255, 0.6);
      opacity: 0;
      -webkit-animation: fadeIn 0.5s ease-out forwards;
      animation: fadeIn 0.5s ease-out forwards;
    }


    .fadeOut {
        -webkit-animation: fadeOut 0.5s ease-out forwards;
        animation: fadeOut 0.5s ease-out forwards;
      }
  
      @-webkit-keyframes fadeIn {
        from {
          opacity: 0;
          -webkit-transform: translateY(-10px);
          -ms-transform: translateY(-10px);
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          -webkit-transform: translateY(0);
          -ms-transform: translateY(0);
          transform: translateY(0);
        }
      }
  
      @keyframes fadeIn {
        from {
          opacity: 0;
          -webkit-transform: translateY(-10px);
          -ms-transform: translateY(-10px);
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          -webkit-transform: translateY(0);
          -ms-transform: translateY(0);
          transform: translateY(0);
        }
      }
  
      @-webkit-keyframes fadeOut {
        from {
          opacity: 1;
          -webkit-transform: translateY(0);
          -ms-transform: translateY(0);
          transform: translateY(0);
        }
        to {
          opacity: 0;
          -webkit-transform: translateY(-10px);
          -ms-transform: translateY(-10px);
          transform: translateY(-10px);
        }
      }
  
      @keyframes fadeOut {
        from {
          opacity: 1;
          -webkit-transform: translateY(0);
          -ms-transform: translateY(0);
          transform: translateY(0);
        }
        to {
          opacity: 0;
          -webkit-transform: translateY(-10px);
          -ms-transform: translateY(-10px);
          transform: translateY(-10px);
        }
      }

      .crisp-client .cc-52lo .cc-kegp .cc-1apq {
        bottom: 44px;
      }
    `}
        </style>
      </Head>
      <div id='loading-wrapper' className='bg-white'>
        <div className='text text-black'>
          Loading <span className='font-normal'>GraphQL Playground</span>
        </div>
      </div>

      <div id='main-content' className='bg-[#172a3a]' />

      <nav className='fixed bottom-0 left-[42%] md:left-[47%] font-bold'>
        <div className='text-[#767676] flex space-x-1 py-2 place-items-center'>
          <h1 className='w-5 md:w-auto truncate text-lg'>graphQL playground</h1>
          <ul className='flex space-x-2 px-4'>
            <li className='underline'>
              <Link href='/api-info'>OpenAPI</Link>
            </li>
            <li className='underline'>
              <Link href='/grpc-docs'>gRPC</Link>
            </li>
          </ul>
        </div>
      </nav>

      <Script
        strategy={'beforeInteractive'}
        src='/js/gql/middleware.js'
        id='gql-playground'
      ></Script>

      <Script
        strategy={'afterInteractive'}
        id={'gql-launch'}
        dangerouslySetInnerHTML={{
          __html: `
            (function (event) {
                const root = document.getElementById('main-content');
                const loadingWrapper = document.getElementById('loading-wrapper');
                
                loadingWrapper.classList.add('fadeOut');
                root.classList.add('playgroundIn');

                GraphQLPlayground.init(root, {
                  endpoint: '${AppConfig.graphQLUrl}',
                  settings: {
                      'editor.fontFamily': 'system-ui'
                  },
                  setTitle: false,
                  faviconUrl: null,
                  title: ""
                })
                
            })()
          `,
        }}
      />
    </div>
  )
}

export default metaSetter(
  { Playground },
  {
    title: 'A11yWatch graphQL playground',
    description:
      'GraphQL playground to test the A11yWatch endpoints and learn the schemas.',
  }
)

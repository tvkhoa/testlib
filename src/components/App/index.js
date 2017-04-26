import React from 'react';
import {
  connect,
} from 'react-redux';
import {
  Tooltip,
} from 'react-tippy';
import {
  compose,
  withState,
} from 'recompose';
import Prism from 'prismjs';
import {
  contentSelector,
  setUsernameAC,
  setTitleAC,
  usernameSelector,
  titleSelector,
} from './state';
import logo from './logo.svg';
import './App.css';

const usageByElementStr = `import {
  Tooltip,
} from 'react-tippy';

...

<Tooltip
  title="Welcome to React"
  position="bottom"
  trigger="click"
>
  <p>
    Click here to show popup
  </p>
</Tooltip>
`;

const usageByHOCStr = `import {
  withTooltip,
} from 'react-tippy';


const Header = () => (
  <h2>Header here</h2>
);

const HeaderWithTootip = withTooltip(Header, {
  title: 'Welcome to React with tooltip',
});`;

const importCssStr = 'import \'react-tippy/dist/tippy.css\';';

const App = ({
  content,
  enabled,
  setEnabled,
  username,
  title,
  setUsername,
  setTitle,
  open,
  setIsOpen,
}) => (
  <div className="App">
    <div className="enter App-header text-center">
      <img src={logo} className="App-logo" alt="logo" />
      <div className="container">
        <h1 className="hero-heading">{ content }</h1>
        <h2 className="hero-subheading">A lightweight tooltip for React.</h2>
        <div className="d-flex justify-content-center align-items-center flex-wrap">
          <small className="hero-badge">
            <span>v0.10.0</span>
          </small>
          <small className="hero-badge">
            <a href="https://popper.js.org" target="_blank" rel="noopener noreferrer" className="hero-link">
              <span>Powered by Popper.js</span>
            </a>
          </small>
          <small className="hero-badge">
            <a href="https://atomiks.github.io/tippyjs/" target="_blank" rel="noopener noreferrer" className="hero-link">
              <span>Based on Tippy.js</span>
            </a>
          </small>
          <small className="hero-badge d-flex align-items-center">
            <a
              className="github-button"
              href="https://github.com/tvkhoa/react-tippy"
              data-style="mega" data-count-href="/tvkhoa/react-tippy/stargazers"
              data-count-api="/repos/tvkhoa/react-tippy#stargazers_count"
              data-count-aria-label="# stargazers on GitHub" aria-label="Star tvkhoa/react-tippy on GitHub"
            >
              Star
            </a>
          </small>
        </div>
      </div>
    </div>
    <main>
      <div className="content-wrapper">
        <div className="container-fluid enter">
          <section id="intro text-left">
            <h2 className="heading-top light">Why you should use it?</h2>
            <p>
              It is designed to work friendly with React,
              it provides {'<Tooltip>'} element or a higher-order component
            </p>
            <p>
              It uses React DOM to render tooltip content.
              Therefore, you can fully use it in your React project without doubt
            </p>
            <p>
              You can show/hide it manually by using `open` and `onRequestClose` prop
            </p>
            <p>
              It is an enhancement of Tippy.js for using in React.
            </p>
            <p>
              This doc is written with react-tippy
            </p>
          </section>
          <section id="features">
            <h2 className="heading-top light">Features</h2>
            <h5 className="text-muted">
              <span className="hidden-md-down">Hover your cursor over the buttons to see tooltip in action!</span>
              <span className="hidden-lg-up">Tap the buttons to see tooltip in action!</span>
            </h5>
            <div className="button-showcase d-flex flex-wrap">
              <Tooltip title="I'm the default tooltip!">
                <button className="btn mt-0 mb-0">Default</button>
              </Tooltip>
              <Tooltip
                title="Look at me on the bottom! 🙃"
                position="bottom"
              >
                <button className="btn mt-0 mb-0">Positioning</button>
              </Tooltip>
              <Tooltip
                title="I have a nice pointy arrow. 👆"
                arrow
              >
                <button className="btn mt-0 mb-0">Arrow</button>
              </Tooltip>
              <Tooltip
                title="You can interact with me as much as you like!"
                interactive
              >
                <button className="btn mt-0 mb-0">Interactive</button>
              </Tooltip>
              <Tooltip
                title="Thanks for clicking!"
                trigger="click"
                animateFill={false}
              >
                <button className="btn mt-0 mb-0">Triggers (click)</button>
              </Tooltip>
              <Tooltip
                title="I'm a light 💡 theme!"
                theme="light"
                animateFill={false}
              >
                <button className="btn mt-0 mb-0">Theme</button>
              </Tooltip>
              <Tooltip
                title="I scaled from nothingness..."
                animation="scale"
                animateFill={false}
              >
                <button className="btn mt-0 mb-0">Scale animation</button>
              </Tooltip>
              <Tooltip
                title="Just a fade!"
                animation="fade"
                animateFill={false}
              >
                <button className="btn mt-0 mb-0">Fade animation</button>
              </Tooltip>
              <Tooltip
                title="Rise or fall"
                animation="shift"
                animateFill={false}
              >
                <button className="btn mt-0 mb-0">Shift animation</button>
              </Tooltip>
              <Tooltip
                title="Am I fancy enough for you?"
                animation="perspective"
                animateFill={false}
              >
                <button className="btn mt-0 mb-0">Perspective animation</button>
              </Tooltip>
              <Tooltip
                title="Delay 600ms"
                delay={600}
              >
                <button className="btn mt-0 mb-0">Delay</button>
              </Tooltip>
              <Tooltip
                title="BAM! 😱"
                duration={0}
              >
                <button className="btn mt-0 mb-0">Instant</button>
              </Tooltip>
              <Tooltip
                title="Physics"
                animateFill={false}
                animation="scale"
                inertia
              >
                <button className="btn mt-0 mb-0">inertia</button>
              </Tooltip>

              <Tooltip
                title="By default, hide duration is the same as show"
                duration={3000}
                animateFill={false}
              >
                <button className="btn mt-0 mb-0">3s Show duration</button>
              </Tooltip>

              <Tooltip
                title="1s in, instant out"
                duration={1000}
                hideDuration={0}
                animateFill={false}
              >
                <button className="btn mt-0 mb-0">1s Hide duration</button>
              </Tooltip>

              <Tooltip
                title="I'll follow your cursor! (Mouse only)"
                followCursor
                animateFill={false}
              >
                <button className="btn mt-0 mb-0">followCursor</button>
              </Tooltip>

              <Tooltip
                title="Callback"
                shown={() => {
                  alert('Hello from the shown() callback!');
                }}
              >
                <button className="btn mt-0 mb-0">Callback</button>
              </Tooltip>

              <Tooltip
                title="I'm just a cute little tooltip"
                size="small"
                animateFill={false}
              >
                <button className="btn mt-0 mb-0">Small</button>
              </Tooltip>

              <Tooltip
                title="I'm a big scary tooltip"
                size="big"
                animateFill={false}
              >
                <button className="btn mt-0 mb-0">Big</button>
              </Tooltip>
              <Tooltip
                title="Wow. I'm a cute tooltip!"
                animateFill={false}
                disabled={!enabled}
              >
                <button
                  className="btn mt-0 mb-0"
                  onClick={() => setEnabled(!enabled)}
                >
                  { !enabled ? 'disabled' : 'enabled' } (toggle)
                </button>
              </Tooltip>
              <Tooltip
                title="I'll flip to the bottom if there's not enough room on the right."
                animateFill={false}
              >
                <button className="btn mt-0 mb-0">Custom flip</button>
              </Tooltip>

            </div>
          </section>
          <section id="custom-htmls" className="text-left">
            <h2 className="heading-top light">Custom HTML</h2>
            <h5 className="text-muted">
              To demo its flexible, let us use an interactive form.
            </h5>

            <div className="card">
              <div className="card-block">
                <div>
                  <span><strong>Username:</strong></span>
                  <Tooltip
                    arrow
                    animateFill={false}
                    trigger="click"
                    interactive
                    style={{
                      display: 'inline-block',
                      paddingLeft: 10,
                      cursor: 'pointer',
                    }}
                    html={(
                      <div>
                        <p>Edit username</p>
                        <input
                          type="text"
                          className="form-control"
                          value={username}
                          onChange={(e) => { setUsername(e.target.value); }}
                        />
                      </div>
                    )}
                  >
                    <span>
                      {username} (click to change)
                    </span>
                  </Tooltip>
                </div>

                <span><strong>Title:</strong></span>
                <Tooltip
                  arrow
                  trigger="click"
                  interactive
                  style={{
                    display: 'inline-block',
                    paddingLeft: 10,
                    cursor: 'pointer',
                  }}
                  html={(
                    <div>
                      <p>Edit title</p>
                      <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value); }}
                      />
                    </div>
                  )}
                >
                  <span>
                    {title} (click to change)
                  </span>
                </Tooltip>
              </div>
            </div>
          </section>

          <section id="custom-htmls" className="text-left">
            <h2 className="heading-top light">Show/ hide manually</h2>
            <div className="button-showcase d-flex flex-wrap">
              <Tooltip
                title="I'm a remote tooltip"
                interactive
                open={open}
                onRequestClose={() => setIsOpen(false)}
              >
                <button className="btn mt-0 mb-0">Dump</button>
              </Tooltip>
              <div>
                <button className="btn mt-0 mb-0" onClick={() => setIsOpen(true)}>
                  I am smart. Click me
                </button>
              </div>
            </div>
          </section>
          <section id="getting-started">
            <h2 className="heading-top light">Getting started</h2>
            <p>Using npm</p>
            <pre><code>npm install --save react-tippy</code></pre>
            <p> Or using yarn</p>
            <pre><code>yarn add react-tippy</code></pre>
          </section>

          <section id="usage">
            <h2 className="heading-top light">Usage</h2>
            <p>Import css to your project</p>
            <pre><code>
              {importCssStr}
            </code></pre>
            <p>After that, you can use {'<Tooltip>'}</p>
            <pre className="language-markup">
              <code
                className="language-markup"
                dangerouslySetInnerHTML={{
                  __html: Prism.highlight(usageByElementStr, Prism.languages.javascript),
                }}
              />
            </pre>
            <br />
            <p>Or you can use it as higher-order component</p>
            <pre className="language-markup">
              <code
                className="language-markup"
                dangerouslySetInnerHTML={{
                  __html: Prism.highlight(usageByHOCStr, Prism.languages.javascript),
                }}
              />
            </pre>
          </section>

          <section id="props">
            <h2 className="heading-top light">Props</h2>
            <p>
              It requires prop <kbd>title</kbd>. It is content of your tooltip. <br />
              If you want to customize your tooltip, use <kbd>html</kbd> instead.
            </p>

            <p>
              <span>For full documentation, please check </span>
              <a href="https://github.com/tvkhoa/react-tippy#props" target="_blank" rel="noopener noreferrer" className="alert-link">
                <span>full props here...</span>
              </a>
            </p>
          </section>

          <section id="doc">
            <h2 className="heading-top light">Note</h2>
            <p>
              The styles of tooltips and this documentation
              are from tippy.js ( powered by Bootstrap )
            </p>
          </section>
          <section id="license">
            <h2 className="heading-top light">License</h2>
            <p>MIT. Also check Popper.js{'\''} license.</p>
          </section>
        </div>
      </div>
    </main>
  </div>
);

const mapStateToProps = (state) => ({
  content: contentSelector(state),
  username: usernameSelector(state),
  title: titleSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  setUsername: (username) => dispatch(setUsernameAC(username)),
  setTitle: (title) => dispatch(setTitleAC(title)),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withState('enabled', 'setEnabled', true),
  withState('open', 'setIsOpen', undefined),
);

export default enhance(App);

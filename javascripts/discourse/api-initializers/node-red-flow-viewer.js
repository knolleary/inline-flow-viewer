import loadScript from "discourse/lib/load-script"
import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.14.0", (api) => {
  // console.log('loading flow viewer');
  // await loadScript(settings.theme_uploads_local.flow_renderer)
  // console.log('loading flow viewer - done');
  
  const renderFlows = async (elem) => {
    if (!window.FlowRenderer) {
      await loadScript(settings.theme_uploads_local.flow_renderer)
    }
    elem.classList.add('flows-decorator');
    const code = elem.querySelector('code');
    if (!code) {
      console.log('code not found in elem', elem);
      return
    }
    let flowData = []
    try {
      flowData = JSON.parse(code.textContent);
    } catch (err) {
      // invalid json - bail out quietly
      return
    }
    const renderer = new FlowRenderer()
    const container = document.createElement('div');
    container.style.height = '400px'
    container.classList.add('flow-renderer-container');
    elem.replaceWith(container)
    try {
      renderer.renderFlows(flowData, { container })
    } catch (err) {
      console.log('error rendering flows', err);
      container.replaceWith(elem)
    }
  }
  
  api.decorateCookedElement((post) => {
    try {
      const elems = post.querySelectorAll('pre[data-code-wrap=flows]:not(.flows-decorator)');
      console.log(elems)
      elems.forEach(elem => {
        renderFlows(elem)
      });
    } catch (e) {
      console.error(e);
    }
  }, {id: 'decorate-flow-viewer'});
  
  // this is a hack learnt from the mermaid plugin
  window.I18n.translations[window.I18n.locale].js.composer.default_nr_flow = '[]'

  api.addComposerToolbarPopupMenuOption({
    icon: "diagram-project",
    label: themePrefix('insert_flow_renderer'),
    action: (toolbarEvent) => {
      toolbarEvent.applySurround(
        "\n```flows\n",
        "\n```\n",
        'default_nr_flow'
      );
    },
  });

});

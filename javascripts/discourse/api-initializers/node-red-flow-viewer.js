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
    const flowData = JSON.parse(code.textContent);
    const renderer = new FlowRenderer()
    const container = document.createElement('div');
    container.style.height = '400px'
    container.classList.add('flow-renderer-container');
    elem.replaceWith(container)
    renderer.renderFlows(flowData, { container })
   
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

  api.addComposerToolbarPopupMenuOption({
    icon: "diagram-project",
    label: 'Add Flow JSON',
    action: (toolbarEvent) => {
      toolbarEvent.applySurround(
        "\n```flows\n",
        "\n```\n"
      );
    },
  });

});

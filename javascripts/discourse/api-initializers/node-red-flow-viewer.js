import loadScript from "discourse/lib/load-script"
import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.14.0", (api) => {
  // console.log('loading flow viewer');
  // await loadScript(settings.theme_uploads_local.flow_renderer)
  // console.log('loading flow viewer - done');
  
  const renderFlows = (post) => {
    console.log('decorateLines called')
    try {
      const elems = post.querySelectorAll('pre[data-code-wrap=flows]:not(.flows-decorator)');
      console.log(elems)
      elems.forEach(elem => {
        elem.classList.add('flows-decorator');
        const code = elem.querySelector('code');
        if (code) {
          console.log(code.innerHTML)
        } else {
          console.log('code not found in elem', elem);
        }
      });
    } catch (e) {
      console.error(e);
    }
  }
  
  api.decorateCookedElement(renderFlows, {id: 'decorate-flow-viewer'});
});

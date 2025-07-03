import loadScript from "discourse/lib/load-script"
import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.14.0", async (api) => {
  console.log('loading flow viewer');
  await loadScript(settings.theme_uploads_local.flow_renderer)
  console.log('loading flow viewer - done');
  
  const decorateLines = (post) => {
    try {
      const elems = post.querySelectorAll('code.lang-flows:not(.flows-decorator)');
      elems.forEach(elem => {

        elem.parentElement.classList.add('flows-decorator');
        console.log(elem.innerHTML)

        elem.innerHTML = 'Getting closer...\n\n' + elem.innerHTML;
      });
    } catch (e) {
      console.error(e);
    }
  }
  
  api.decorateCookedElement(decorateLines, {id: 'decorate-flow-viewer'});
});

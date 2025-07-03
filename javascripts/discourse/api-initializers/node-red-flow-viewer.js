import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.14.0", (api) => {
  const decorateLines = (post) => {
    try {
      const elems = post.querySelectorAll('code.lang-flows:not(.flows-decorator)');
      elems.forEach(elem => {

        elem.parentElement.classList.add('flows-decorator');
        elem.innerHTML = 'something here!'
      });
    } catch (e) {
      console.error(e);
    }
  }
  
  api.decorateCookedElement(decorateLines, {id: 'decorate-flow-viewer'});
});

import diffRender from './diffRender';
import plainRender from './plainRender';
import jsonRender from './jsonRender';

const renderers = {
  diff: diffRender,
  plain: plainRender,
  json: jsonRender,
};

export default format => renderers[format];

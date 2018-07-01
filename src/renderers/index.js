import diffRender from './diffRender';
import plainRender from './plainRender';

const renderers = {
  diff: diffRender,
  plain: plainRender,
};

export default format => renderers[format];

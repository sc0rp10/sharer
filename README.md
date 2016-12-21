#Sharer

Usage:
```html
<div data-share="fb" data-title="title to fb" data-text="share to fb" data-picture="https://path.to.image">share to fb</div>
<div data-share="vk" data-title="title to vk" data-text="share-to-vk" data-picture="https://path.to.image">share to vk</div>
<div data-share="tw" data-text="share to tw">share to tw</div>
```
```js
var sharer = require("sharer");
var Sharer = new Sharer();
Sharer.run();
```

## Available parameters
1. data-title – sets title for VK and Facebook.
2. data-text – sets description for VK, Facebook and twitter.
3. data-url – sets shared url for VK and Facebook.
4. data-picture – sets shared picture for VK and Facebook.

By default Sharer use standard meta-tags.

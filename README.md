# react-player-youtube

A Simple player

## Installation

    npm i react-player-youtube --save

## Usage

```js
import { VideoPlayerProvider } from 'react-player-youtube';

<VideoPlayerProvider>
  <App />
</VideoPlayerProvider>;
```

### Placeholder Overrides

```js
const options = {
  placeholder: '#',
};
const { filterBadWord } = useBadWords(options);

console.log(filterBadWord('What the hell')); // What the ####
```

### Add words to the blacklist

```js
const blackList = ['ass', 'cum'];
const { addWords } = useBadWords();

useEffect(() => {
  addWords(blackList);
}, []);

console.log(filterBadWord('cum to me')); // *** to me
```

### Instantiate with an empty list bad words

```js
const options = {
  emptyList: true,
};
const { filterBadWord } = useBadWords(options);

console.log(filterBadWord('What the hell')); // What the hell
```

### Remove words from the blacklist

```js
const whiteList = ['ass', 'cum'];
const { removeWord } = useBadWords();

useEffect(() => {
  removeWord(whiteList);
}, []);

console.log(filterBadWord('cum to me')); // cum to me
```

### Check for obscene content

```js
const { hasBadWord } = useBadWords();

console.log(hasBadWord('cum to me')); // true
```

**Parameters**

- `options` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Filter instance options (optional)
- `options.emptyList` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Instantiate filter with no blacklist
- `options.placeholder` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Character used to replace obscene words.

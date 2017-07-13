# AppSwitcher

This component provides an ADG3 app switcher.

![Example @NAME@](https://i.imgur.com/zjOGkM7.png)

## Try it out

Interact with a [live demo of the @NAME@ component](https://aui-cdn.atlassian.com/atlaskit/stories/@NAME@/@VERSION@/).

## Installation

```sh
npm install @NAME@
```

## Using the component

Use the component in your React app as follows:

```javascript
import AkAppSwitcher from '@NAME@';

const data = {
 "recentContainers": [
   {
     "name": "Recent container",
     "url": "https://instance.atlassian.net/container1",
     "iconUrl": "https://instance.atlassian.net/container1-icon.png",
     "type": "Space"
   },
   {
     "name": "Recent container",
     "url": "https://instance.atlassian.net/container2",
     "iconUrl": "https://instance.atlassian.net/container1-icon.png",
     "type": "Software Project"
   },
   {
     "name": "https://instance.atlassian.net/container3",
     "url": "https://instance.atlassian.net/container3",
     "iconUrl": "https://instance.atlassian.net/container1-icon.png",
     "type": "Space"
   }
 ],
 "linkedApplications": {
   "configureLink": "https://instance.atlassian.net/configure-application-links",
   "apps": [
     {
       "name": "JIRA",
       "url": "https://instance.atlassian.net/"
     },
     {
       "name": "Confluence",
       "url": "https://instance.atlassian.net/wiki"
     },
     {
       "name": "Other application",
       "url": "https://other.application.com"
     }
   ]
 },
 "suggestedApplication": {
   "show": true,
   "application": "confluence",
   "description": "Issue & project tracking software",
   "url": "https://www.atlassian.com"
 },
 "i18n": {
   "home": "Home",
   "apps": "Apps",
   "configure": "Configure",
   "try.other.apps": "Try Other Atlassian Apps",
   "don't.show.this.again": "Don’t show this again"
 }
}

ReactDOM.render(<AkAppSwitcher {...data} />, container);
```

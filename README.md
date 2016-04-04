## Nightwatch custom commands and assertions for the VI Frontend-Boilerplate

npm package for [gulp-frontend-boilerplate](https://github.com/virtualidentityag/gulp-frontend-boilerplate).
Contains Nightwatchjs custom commands and assertions.

### How to install

```
npm install https://github.com/virtualidentityag/vi-custom-assertions-commands.git --save-dev
```

open the nightwatch.json file and edit the `custom_assertions_path` like this:

```json
{
	//... 
	
	"custom_assertions_path" : "node_modules/vi-custom-assertions-commands/assertions",
	
	//... 
}
```

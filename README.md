# davidlj95's website
The aim of this repository is to store the code for my personal website

## Development
### IDE
Project was developed using [RubyMine](https://www.jetbrains.com/ruby/).

There are some tasks available 

### SCSS Formatter
In order to format the SCSS file properly, [Prettier](https://prettier.io/) is used.

#### Run formatter via Ruby's gem
You can run the formatter via the installed [`prettier`](https://github.com/prettier/plugin-ruby) gem.

```
bundle exec rbprettier --write '**/*.scss'
```

There is also a task configured for RubyMine to run it easily.

#### Run formatter via Ruby's gem
For a better development experience, you can integrate it with RubyMine's [Prettier plugin](https://plugins.jetbrains.com/plugin/10456-prettier).

Install it using `npm` & [configure `Prettier` to format those files](https://www.jetbrains.com/help/ruby/prettier.html#ws_prettier_install)

 Files to look for: `{**/*,*}.{scss}`

Very recommendable to enable "_On 'Reformat code' action_" & "_On save_" options
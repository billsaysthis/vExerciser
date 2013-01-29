# vExerciser

This is a small app that shows a set of exercises in sequence, pulling the sets from Parse.com.

The code is based on [Ratchet](https://github.com/maker/ratchet) and accordingly only looks good on an iPhone.

## Parse

### Parse Configuration

* Create your Parse account (if necessary)
* Create a new Parse App on the Dashboard
* Get the app's Application Key and Javascript Key
* Copy lib/parseKey.example.js to lib/parseKey.js and replace the text with the real values for each key. This file is .gitignored because you don't want your keys in your Github code, right?
* Import your CSV file into an object called Exercise

### Parse Data Object

There are four fields, all strings:

* workout: set number
* step: step number (within the set)
* instruction: text stating the exercise to do, should be short to fit in large font size on a small screen
* repetitions: number of times to repeat the exercise

Easiest way to get the data on Parse is to create a CSV file:

* first line: workout, step, instruction, repetitions
* remaining lines: (workout #, step #, instruction text, repetition count)
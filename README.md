# tiles

Cool little animation builder

# Contents

1.  [Concept](#concept)
2.  [API](#api)
    2.1. [Registering an Animation](#registering-an-animation)
    2.2. [Animation Function](#animation-function)
    2.3. [Event Object](#event-object)
    2.4. [Tile Object](#tile-object)

## Animation Function

Here we add some information about the context of the animation function which is an [Event Object](#event-object)

## Event Object

Add some introductory information here...

### Properties and Methods

| key           | type     | return | description                                                                            |
| ------------- | -------- | ------ | -------------------------------------------------------------------------------------- |
| triggerCoords | `string` | N/A    | The x,y coordinates of the tile that was clicked to trigger the animation. Eg: `40,20` |

## Tile Object

Add some information explaining what a tile object is

### Properties and Methods

| key        | type     | return | description                                                                                                                                                                   |
| ---------- | -------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| neighbours | `object` | N/A    | A object with pointers to the tile objects that border the tile in question. The pointers are indexed according to their relative position to the tile in question (Figure A) |

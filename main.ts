function giggle () {
    soundExpression.giggle.playUntilDone()
}
function Dance () {
    for (let index = 0; index < 4; index++) {
        pins.servoWritePin(AnalogPin.P2, 90)
        basic.pause(100)
        pins.servoWritePin(AnalogPin.P1, 90)
        basic.pause(100)
        pins.servoWritePin(AnalogPin.P2, 0)
        basic.pause(100)
        pins.servoWritePin(AnalogPin.P1, 180)
        basic.pause(100)
        pins.servoWritePin(AnalogPin.P2, 180)
        basic.pause(100)
        pins.servoWritePin(AnalogPin.P1, 0)
    }
    pins.servoWritePin(AnalogPin.P2, 90)
    pins.servoWritePin(AnalogPin.P1, 90)
}
function avSound () {
    total = 0
    for (let index = 0; index <= 4; index++) {
        index += Sounds[index]
    }
    return total / 5
}
input.onButtonPressed(Button.A, function () {
    EyesRight.showImage(0)
    pins.servoWritePin(AnalogPin.P1, RightArm * 90)
    basic.pause(500)
    Eyes.showImage(0)
    RightArm += 1
    if (RightArm > 2) {
        RightArm = 0
    }
})
function avLight () {
    total = 0
    for (let index = 0; index <= 4; index++) {
        index += Lights[index]
    }
    return total / 5
}
radio.onReceivedString(function (receivedString) {
    if (receivedString == "L") {
        EyesLeft.showImage(0)
        pins.servoWritePin(AnalogPin.P2, LeftArm * 90)
        basic.pause(500)
        Eyes.showImage(0)
        LeftArm += 1
        if (LeftArm > 2) {
            LeftArm = 0
        }
    }
    if (receivedString == "R") {
        EyesRight.showImage(0)
        pins.servoWritePin(AnalogPin.P1, RightArm * 90)
        basic.pause(500)
        Eyes.showImage(0)
        RightArm += 1
        if (RightArm > 2) {
            RightArm = 0
        }
    }
})
input.onButtonPressed(Button.B, function () {
    EyesLeft.showImage(0)
    pins.servoWritePin(AnalogPin.P2, LeftArm * 90)
    basic.pause(500)
    Eyes.showImage(0)
    LeftArm += 1
    if (LeftArm > 2) {
        LeftArm = 0
    }
})
let total = 0
let Lights: number[] = []
let Sounds: number[] = []
let LeftArm = 0
let RightArm = 0
let EyesLeft: Image = null
let EyesRight: Image = null
let Eyes: Image = null
radio.setGroup(1)
let Threshold = 1.2
Eyes = images.createImage(`
    . . . . .
    . # . # .
    . . . . .
    . # # # .
    . . . . .
    `)
let Smile = images.createImage(`
    . . . . .
    . # . # .
    . . . . .
    . # . # .
    . . # . .
    `)
EyesRight = images.createImage(`
    . . . . .
    # . # . .
    . . . . .
    . # # # .
    . . . . .
    `)
EyesLeft = images.createImage(`
    . . . . .
    . . # . #
    . . . . .
    . # # # .
    . . . . .
    `)
RightArm = 1
LeftArm = 1
Eyes.showImage(0)
Sounds = [0, 0, 0, 0, 0]
Lights = [0, 0, 0, 0, 0]
basic.forever(function () {
    Sounds.shift()
    Sounds.push(input.soundLevel())
    Lights.shift()
    Lights.push(input.lightLevel())
    basic.pause(500)
})
basic.forever(function () {
    if (randint(0, 10) > 8) {
        Dance()
    }
    if (Threshold * avLight() < input.lightLevel()) {
        Dance()
    }
    basic.pause(500 * randint(4, 10))
})
basic.forever(function () {
    if (randint(0, 10) > 8) {
        Smile.showImage(0)
        giggle()
        Eyes.showImage(0)
    }
    if (Threshold * avSound() < input.soundLevel()) {
        Smile.showImage(0)
        giggle()
        Eyes.showImage(0)
    }
    basic.pause(500 * randint(4, 10))
})

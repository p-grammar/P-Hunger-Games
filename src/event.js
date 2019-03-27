/* eslint-disable no-unused-vars */
class Event
{
    constructor (canExecuteFunc, executeFunc)
    {
        this.canExecute = canExecuteFunc;
        this.execute = executeFunc;
    }
}

var rainEvent = new Event(function()
{
    return true;
},
function()
{
    console.log("rain");
});

var snowEvent = new Event(function()
{
    return true;
},
function()
{
    console.log("snow");
});

interface jQuery {
    (selector: (string | any)): jQueryElement;
    fn: any;
    version: number;
}

interface jQueryElement {
    data(name: string): any;
    data(name: string, data: any): jQueryElement;
}

interface jQueryElement {
    todo(): Todo;
    todo(todo: Todo): jQueryElement;
}

var $ = <jQuery>function(selector) {
    //Find DOM element
}

$.fn.todo = function(todo?: Todo): Todo {
    if(todo) {
        $(this).data('todo',todo);
    }
    else {
        return $(this).data('todo');
    }
}
var todo: Todo = {
    id: 1,
    name : "Study TypeScript",
     get state() {
         return this._state;
     },
     set state(newState) {
         if(newState == TodoState.Complete) {

             var canBeCompleted =
             this.State == TodoState.Active
             || this.State == TodoState.Deleted;
             
             if(!canBeCompleted) {
                 throw "Todo must be Active or Deleted in order to be marked Completed"
             }
         }

         this._state = newState;
     }
    };

var container = $('#container');
container.data('todo', todo);
container.todo(todo);

class SmartTodo {
    //class created to demonstrate getter and setter
    _state : TodoState;
    name: string;
    get state() {
        return this._state;
    }
    set state(newState) {
        if(newState == TodoState.Complete) {

            var canBeCompleted =
            this.state == TodoState.Active
            || this.state == TodoState.Deleted;
            
            if(!canBeCompleted) {
                throw "Todo must be Active or Deleted in order to be marked Completed"
            }
        }

        this._state = newState;
    }
}

abstract class TodoStateChanger {
    constructor(protected newState: TodoState) {
    }

    abstract canChangeState(todo: Todo): boolean;

    changeState(todo: Todo): Todo {
        if(this.canChangeState(todo)) {
            todo.state = this.newState;
        }
        return todo;
    }
}

class CompleteTodoStateChanger extends TodoStateChanger {
    constructor() {
        super(TodoState.Complete);
    }

    canChangeState(todo: Todo): boolean {
        return !!todo &&
            (todo.state == TodoState.Active 
            || todo.state == TodoState.Deleted)
    }
}
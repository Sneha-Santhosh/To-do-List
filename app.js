// class TodoService {
//     static lastId: number = 0;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $ = function (selector) {
    //Find DOM element
};
$.fn.todo = function (todo) {
    if (todo) {
        $(this).data('todo', todo);
    }
    else {
        return $(this).data('todo');
    }
};
var todo = {
    id: 1,
    name: "Study TypeScript",
    get state() {
        return this._state;
    },
    set state(newState) {
        if (newState == TodoState.Complete) {
            var canBeCompleted = this.State == TodoState.Active
                || this.State == TodoState.Deleted;
            if (!canBeCompleted) {
                throw "Todo must be Active or Deleted in order to be marked Completed";
            }
        }
        this._state = newState;
    }
};
var container = $('#container');
container.data('todo', todo);
container.todo(todo);
var SmartTodo = /** @class */ (function () {
    function SmartTodo() {
    }
    Object.defineProperty(SmartTodo.prototype, "state", {
        get: function () {
            return this._state;
        },
        set: function (newState) {
            if (newState == TodoState.Complete) {
                var canBeCompleted = this.state == TodoState.Active
                    || this.state == TodoState.Deleted;
                if (!canBeCompleted) {
                    throw "Todo must be Active or Deleted in order to be marked Completed";
                }
            }
            this._state = newState;
        },
        enumerable: false,
        configurable: true
    });
    return SmartTodo;
}());
var TodoStateChanger = /** @class */ (function () {
    function TodoStateChanger(newState) {
        this.newState = newState;
    }
    TodoStateChanger.prototype.changeState = function (todo) {
        if (this.canChangeState(todo)) {
            todo.state = this.newState;
        }
        return todo;
    };
    return TodoStateChanger;
}());
var CompleteTodoStateChanger = /** @class */ (function (_super) {
    __extends(CompleteTodoStateChanger, _super);
    function CompleteTodoStateChanger() {
        return _super.call(this, TodoState.Complete) || this;
    }
    CompleteTodoStateChanger.prototype.canChangeState = function (todo) {
        return !!todo &&
            (todo.state == TodoState.Active
                || todo.state == TodoState.Deleted);
    };
    return CompleteTodoStateChanger;
}(TodoStateChanger));

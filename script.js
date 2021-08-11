'use strict' ;

class TodoItem {

    constructor ( id , description , done ) {
        this.id = id ;
        this.description = description ;
        this.done = done ;
    }

}

class TodoList {

    #_id = 0 ;
    items = [] ;
    #_done = false ;

    constructor () {

        const wrapNewItem = document.createElement ( 'div' ) ;
        wrapNewItem.id = 'wrapNewItem' ;
        wrapNewItem.classList.add ( 'wrapNewItem' ) ;
        application.append ( wrapNewItem ) ;

    }

    add ( description ) {
        this.items.push( new TodoItem ( ++this.#_id , description, this.#_done ) ) ;
        this.#_renderNewTodoItem () ;
    }

    // отрисовка всех TodoIten. По умолчанию не используется. Предположительно сильно нагружает систему при очень большом количестве TodoItem
    #_renderAll () {

        document.getElementById ( 'wrapNewItem' ).remove () ;
        const wrapNewItem = document.createElement ( 'div' ) ;
        wrapNewItem.id = 'wrapNewItem' ;
        wrapNewItem.classList.add ( 'wrapNewItem' ) ;
        application.append ( wrapNewItem ) ;

        for ( let key = this.items.length - 1 ; key >= 0 ; --key ) { 

            const itemValue = document.createElement ( 'div' ) ;
            itemValue.classList.add ( 'itemValue' ) ;
            itemValue.id = 'item' + this.items [ key ].id ;
            itemValue.innerText = this.items [ key ].description ;
            wrapNewItem.append ( itemValue ) ;

            const itemCheck = document.createElement ( 'input' ) ;
            itemCheck.type = 'checkbox' ;
            itemCheck.id = 'checkbox' + this.items [ key ].id ;
            if ( this.items [ key ].done === true ) {
                itemCheck.checked = true ;
                itemValue.classList.add ( 'textDecoration__line-through' ) ;
            }
            wrapNewItem.append ( itemCheck ) ;

            if ( this.items [ key ].id > 1 ) {
                const line = document.createElement ( 'div' ) ;
                line.classList.add ( 'line' ) ;
                wrapNewItem.append ( line ) ;
            }

        }    
            
    }

    // отрисовка каждого нового TodoIten. Используется по умолчанию
    #_renderNewTodoItem ( id, description, done ) {
        
        if ( this.items [ this.items.length - 1  ].id > 1 ) {
            const line = document.createElement ( 'div' ) ;
            line.classList.add ( 'line' ) ;
            wrapNewItem.prepend ( line ) ;
        } 

        const itemCheck = document.createElement ( 'input' ) ;
        itemCheck.type = 'checkbox' ;
        itemCheck.id = 'checkbox' + this.items [ this.items.length - 1  ].id ;
        if ( this.items [ this.items.length - 1  ].done === true ) {
            itemCheck.checked = true ;
            itemValue.classList.add ( 'textDecoration__line-through' ) ;
        }
        wrapNewItem.prepend ( itemCheck ) ;

        const itemValue = document.createElement ( 'div' ) ;
        itemValue.classList.add ( 'itemValue' ) ;
        itemValue.id = 'item' + this.items [ this.items.length - 1 ].id ;
        itemValue.innerText = this.items [ this.items.length - 1  ].description ;
        wrapNewItem.prepend ( itemValue ) ;        

    }

}

const application = document.getElementById ( 'application' ) ;
application.addEventListener ( 'click' , event => eventApplication() ) ;
function eventApplication () {
    if ( event.target.matches ( 'input' ) && event.target.type === 'checkbox' ) {
        const currentId = event.target.id.slice ( 8 ) ;
        const currentIndex = todoListObject.items.findIndex ( item => String ( item.id ) === currentId ) ;
        if ( event.target.checked )  {            
            document.getElementById ( 'item' + currentId ).classList.add ( 'textDecoration__line-through' ) ;
            todoListObject.items [ currentIndex ].done = true ;
        }
        else {
            document.getElementById ( 'item' + currentId ).classList.remove ( 'textDecoration__line-through' ) ;
            todoListObject.items [ currentIndex ].done = false ;
        }
    }
}

const todoListObject = new TodoList () ;

const heading = document.getElementById ( 'heading' ) ;

const inputText = document.getElementById ( 'inputText' ) ;
inputText.addEventListener ( 'keydown' , event => eventInputText ()  ) ;
function eventInputText () {
    if ( event.code === 'Enter' && inputText.value.trim () ) {
        todoListObject.add( inputText.value ) ;
        inputText.value = '' ;   
    }
}

const buttonAdd = document.getElementById ( 'buttonAdd' ) ;
buttonAdd.addEventListener ( 'click' , event => eventButtonAdd () ) ;
function eventButtonAdd () {
    if ( inputText.value.trim () ) {
        todoListObject.add( inputText.value ) ;
        inputText.value = '' ;     
    }
}
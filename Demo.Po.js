describe('angularjs homepage', function() {
  it('should greet the named user', function() {
    browser.get('http://www.angularjs.org');

    element(by.model('yourName')).sendKeys('Julie');

    var greeting = element(by.binding('yourName'));

    expect(greeting.getText()).toEqual('Hello Julie!');
  });

  describe('todo list', function() {
    var todoList;

    beforeEach(function() {
      browser.get('http://www.angularjs.org');

      todoList = element.all(by.repeater('todo in todoList.todos'));
    });
    describe('ElementFinder.then', function() {
      var fqdn = browser.params.fqdn;
    
      beforeEach(function(){
        browser.get('http://' + fqdn);
        browser.ignoreSynchronization = true;
      });  
    it('should always return a promise', function(){
        var e1 = element(by.tagName("body")).then(function(){});
        expect(e1).toBeUndefined();
        //expect(typeof (e1.then)).toBe("function");
    
        var e1 = element(by.tagName("body"))
        .then(function(){return protractor.promise.fullyResolved({});});
        expect(e1).not.toBeUndefined();
        expect(typeof (e1.then)).toBe("function");
      });
    
    });

    it('should list todos', function() {
      expect(todoList.count()).toEqual(2);
      expect(todoList.get(1).getText()).toEqual('build an angular app');
    });

    it('should add a todo', function() {
      var addTodo = element(by.model('todoList.todoText'));
      var addButton = element(by.css('[value="add"]'));

      addTodo.sendKeys('write a protractor test');
      addButton.click();

      expect(todoList.count()).toEqual(3);
      expect(todoList.get(2).getText()).toEqual('write a protractor test');
    });
  });
});

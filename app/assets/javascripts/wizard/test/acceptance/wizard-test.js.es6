module("Acceptance: wizard");

test("Wizard starts", assert => {
  visit("/");
  andThen(() => {
    assert.ok(exists('.wizard-column-contents'));
    assert.equal(currentPath(), 'step');
  });
});

test("Forum Name Step", assert => {
  visit("/step/hello-world");
  andThen(() => {
    assert.ok(exists('.wizard-step'));
    assert.ok(exists('.wizard-step-hello-world'), 'it adds a class for the step id');

    assert.ok(exists('.wizard-step-title'));
    assert.ok(exists('.wizard-step-description'));
    assert.ok(!exists('.invalid .field-full-name'), "don't show it as invalid until the user does something");
  });

  // invalid data
  click('.wizard-next');
  andThen(() => {
    assert.ok(exists('.invalid .field-full-name'));
  });

  // server validation fail
  fillIn('input.field-full-name', "Server Fail");
  click('.wizard-next');
  andThen(() => {
    assert.ok(exists('.invalid .field-full-name'));
  });

  // server validation ok
  fillIn('input.field-full-name', "Evil Trout");
  click('.wizard-next');
  andThen(() => {
    assert.ok(!exists('.wizard-step-title'));
    assert.ok(!exists('.wizard-step-description'));
    assert.ok(exists('input.field-email'), "went to the next step");
  });
});

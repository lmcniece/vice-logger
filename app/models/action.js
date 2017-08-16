import Model from 'ember-data/model';

export default Model.extend({
    username: DS.attr(),
    action: DS.attr(),
    created_at: DS.attr()
});

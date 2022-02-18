
exports.up = function(knex) {
  return knex.schema
    .createTable('projects', tbl => {
        tbl.increments('project_id')
        tbl.string('project_name', 128).notNullable()
        tbl.string('project_description', 128)
        tbl.integer('project_completed').defaultTo(0).unsigned()
    })
    .createTable('resources', tbl => {
        tbl.increments('resource_id')
        tbl.string('resource_name', 128).notNullable().unique()
        tbl.string('resource_description', 128)
    })
    .createTable('tasks', tbl => {
        tbl.increments('task_id')
        tbl.string('task_description', 128).notNullable()
        tbl.string('tasks_notes')
        tbl.integer('tasks_completed').defaultTo(0).unsigned()
        tbl.integer('project_id')
            .notNullable()
            .unsigned()
            .references('project_id')
            .inTable('projects')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
    })
    .createTable('project_resources', tbl => {
        tbl.increments('project_resources_id')
        tbl.string('resource_assignment', 128)
        tbl.integer('resource_id')
            .notNullable()
            .unsigned()
            .references('resource_id')
            .inTable('resources')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropIfTableExists('project_resources')
    .dropIfTableExists('tasks')
    .dropIfTableExists('resources')
    .dropIfTableExists('projects')
};

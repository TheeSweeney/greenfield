var db = require('./db/index.js');

var get = function(userId, callback) {
  var params = [userId];

  var sql = 'SELECT DISTINCT events.*, venues.name \
              FROM users_events \
              JOIN users on users_events.user_id = users.id \
              JOIN events on users_events.event_id = events.id \
              JOIN venues on events.venue_id = venues.id \
              and users.id = ? ';

  db.queryHelper(sql, params, function(results) {
    callback(results);
  });

}

var add = function(userId, eventId, callback) {
  var params = [
    userId,
    eventId
  ];

  var sql = 'INSERT INTO `users_events` (`user_id`, `event_id`) VALUES( ? , ? );';

  db.queryHelper(sql, params, function(results) {
    params = [results.insertId];
    sql = 'select * from users_events where id = ?;'
    db.queryHelper(sql, params, function(results) {
      //return inserted record
      callback(results[0]);
    });
  });
}

var remove = function(userId, eventId, callback) {
  var params = [
    userId,
    eventId
  ];

  var sql = 'DELETE FROM `users_events` where `user_id` = ? and `event_id` = ?;';
  db.queryHelper(sql, params, function(results) {
    res.status(200).end();
  });
}

module.exports.get = get;
module.exports.add = add;
module.exports.remove = remove;

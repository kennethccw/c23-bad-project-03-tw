
select user_id,  mood_emoticon_id, created_at from moodlog_calendar order by created_at DESC where user_id=2;

SELECT mood_emoticon_id,COUNT(*) AS "Number of happy"
FROM moodlog_calender
Where 
GROUP BY mood_emoticon_id;

select mood_emoticon_id,user_id, count(*) from moodlog_calendar where user_id = 2 group by mood_emoticon_id; 


select mood_emoticon_id, count(*) AS "number of happy"
from moodlog_calendar
group by mood_emoticon_id
having count(*)mood_emoticon_id=4;

select * from moodlog_calendar where created_at >= current_date at time zone 'UTC' - interval '7 days'


select emotion_map_id,user_id,created_at from mood_emoticon where created_at between current_date -6 and current_date;


select emotion_map_id Max (emotion_map_id) from mood_emoticon where created_at between current_date -6 and current_date;


CREATE USER Suet123 WITH PASSWORD 'gwfw7reufhhfhf' SUPERUSER;

ALTER ROLE Suet123 WITH LOGIN;


 select username,image from users where level like 'admin';


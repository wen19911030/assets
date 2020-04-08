-- 查询指定项目 省份分布情况
SELECT province, count(*) as counts
FROM performance
WHERE projectId="e40373c73c354ac10b0b43bf25e58395"
GROUP BY province
HAVING province not IN ('局域网', '')
ORDER BY counts DESC

-- 查询指定项目 城市分布情况
SELECT city, count(*) as counts
FROM performance
WHERE projectId="e40373c73c354ac10b0b43bf25e58395"
GROUP BY city
HAVING city not IN ('局域网', '')
ORDER BY counts DESC

-- 查询指定项目 用户访问量
SELECT DATE(createTime) as date, count(*) as counts
FROM performance
WHERE projectId="e40373c73c354ac10b0b43bf25e58395"
GROUP BY DATE(createTime)
ORDER BY counts DESC

-- 查询指定项目 PV，UV，IP访问量
SELECT DATE(createTime) AS date, count(*) as pvCounts, count(DISTINCT sessionId) AS uvCounts, count(DISTINCT IP) AS ipCounts
FROM performance
WHERE projectId="e40373c73c354ac10b0b43bf25e58395"
GROUP BY DATE(createTime)
ORDER BY pvCounts DESC

-- 查询指定项目, 指定日期 PV，UV，IP访问量，新访客
SELECT count(*) as pvCounts, count(DISTINCT sessionId) AS uvCounts, count(DISTINCT IP) AS ipCounts, 
	(SELECT COUNT(DISTINCT sessionId) FROM performance WHERE projectId="e40373c73c354ac10b0b43bf25e58395" AND DATE(createTime)="2020-03-08" AND sessionId NOT IN (SELECT DISTINCT sessionId FROM performance WHERE DATE(createTime)<"2020-03-08")) AS newUvCounts
FROM performance
WHERE projectId="e40373c73c354ac10b0b43bf25e58395" AND DATE(createTime)="2020-03-08";

-- 查询指定项目 PV
select DATE(createTime) as date, count(*) as counts
from performance
WHERE projectId="e40373c73c354ac10b0b43bf25e58395"
GROUP BY DATE(createTime)
ORDER BY counts DESC

-- 查询指定项目 UV
select DATE(createTime) as date, count(*) as counts
from performance
WHERE projectId="e40373c73c354ac10b0b43bf25e58395"
GROUP BY DATE(createTime)
ORDER BY counts DESC

-- 查询指定项目 IP
SELECT DATE(createTime) AS date, count(DISTINCT IP) AS counts
FROM performance
WHERE projectId="e40373c73c354ac10b0b43bf25e58395"
GROUP BY DATE(createTime)
ORDER BY counts DESC

-- 创建视图
CREATE VIEW models
AS SELECT projectId, sessionId, IP, screenW, screenH, substring_index(substring_index(device,'os":"',-1),'","userAgent"',1) as os, substring_index(substring_index(device,'model":"',-1),'"}',1) as model, province, city, createTime
FROM performance
WHERE device REGEXP '.+model":"(.+)"';

-- 手机品牌排行版
SELECT phone, count, ROUND(count / total, 2) AS rate
FROM (
  SELECT * FROM (
    SELECT CONCAT(model, '&', screenW, '&', screenH) as phone, COUNT(1) AS count
    FROM models
    WHERE projectId="e40373c73c354ac10b0b43bf25e58395"
    GROUP BY phone
    ORDER BY count DESC
    LIMIT 10
  ) AS t1
  INNER JOIN (
    SELECT COUNT(1) AS total
    FROM models
    WHERE projectId="e40373c73c354ac10b0b43bf25e58395"
  ) AS t2
) AS t;

-- 操作系统排行版
SELECT model, count(*) as counts
FROM models
WHERE projectId="e40373c73c354ac10b0b43bf25e58395"
GROUP BY model
ORDER BY counts DESC

-- 7日留存率

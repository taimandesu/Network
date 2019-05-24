import tweepy
import csv
from config import CONFIG

CONSUMER_KEY = CONFIG["CONSUMER_KEY"]
CONSUMER_SECRET = CONFIG["CONSUMER_SECRET"]
ACCESS_TOKEN = CONFIG["ACCESS_TOKEN"]
ACCESS_SECRET = CONFIG["ACCESS_SECRET"]

auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(ACCESS_TOKEN, ACCESS_SECRET)
api = tweepy.API(auth)

tweet_data = [] #取得したツイートを格納するリスト

for tweet in api.search(q="映画 min_faves:500 min_retweets:500 exclude:retweets",tweet_mode='extended',count=10):
    try:
        tweet_data.append([tweet.id, tweet.user.screen_name, tweet.created_at, tweet.full_text.replace('\n',''), tweet.favorite_count, tweet.retweet_count, tweet.user.followers_count, tweet.user.friends_count])
    except Exception as e:
        print(e)

with open('tweet_test.csv', 'w',newline='',encoding='utf-8') as f:
    writer = csv.writer(f, lineterminator='\n')
    writer.writerow(["id","user","created_at","text","fav","RT","follower","follows"])
    writer.writerows(tweet_data)
pass

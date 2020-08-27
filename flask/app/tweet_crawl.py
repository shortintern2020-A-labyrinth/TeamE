# Kento Tanaka
# To crawl tweet data

import tweepy
import random
import re
import MeCab
import csv 
import itertools
# import setting

artist_list = []
with open('pop_artists.csv') as f:
    reader = csv.reader(f)
    for row in reader:
        artist_list.append(row)

artist_list = list(itertools.chain.from_iterable(artist_list))

# スクリーンネーム管理
screen_names = set()
# 既に呼び出したネーム管理
already_names = set()

while True:
    # ここに先程取得したAPIキーとトークンを入力
    # 環境変数の呼び出しをsetting.pyに記載
    # 値は.envに保存
    # api_key = setting.api_key
    # api_secret_key = setting.api_secret_key
    # access_token = setting.access_token
    # access_token_secret = setting.access_token_secret

    api_key = ""
    api_secret_key = ""
    access_token = ""
    access_token_secret = ""


    # twitterのOAuth認証
    auth = tweepy.OAuthHandler(api_key, api_secret_key)
    auth.set_access_token(access_token, access_token_secret)
    # twiiter APIではリクエストに回数制限あり
    # wait_on_rate_limit は制限がリセットされるまでプログラムを休止するオプション
    api = tweepy.API(auth_handler=auth, wait_on_rate_limit=True)

    # botのツイートを除外するため，一般的なクライアント名を列挙
    # 人間のツイートを取りたいので
    sources = ["TweetDeck", "Twitter Web Client", "Twitter for iPhone",
               "Twitter for iPad", "Twitter for Android", "Twitter for Android Tablets",
               "ついっぷる", "Janetter", "twicca", "Keitai Web", "Twitter for Mac"]

    

    for s in api.search(q='#NowPlaying', lang='ja', result_type='mixed', count=1000, tweet_mode='extended'):
        # sは抽出したツイート
        if s.source in sources:
            if s.author.screen_name not in screen_names:
            # ツイートを行ったユーザのスクリーンネームを取得
                screen_names.add(s.author.screen_name)

    # # ステータスidからステータスを得るためのdict
    # id2status = {}

    # スクリーンネームからタイムラインを取得してツイートを保存．
    favorite_artist = []
    for name in screen_names:
        if name in already_names:
            continue
        my_playing = []
        try:
            # ユーザの呟いたtweetを700取得
            for s in api.user_timeline(name, tweet_mode='extended', count=700):
                if "#NowPlaying" in s.full_text:
                    # my_playing.append(s.full_text)
                    # 固有名詞を含まないtweetかどうか
                    # t = MeCab.Tagger('')
                    # splitted_s = t.parse(s.full_text)
                    for artist in artist_list:
                        if artist in s.full_text:
                            my_playing.append(artist)
                        else:
                            continue

        except Exception as e:
            continue

        already_names.add(name)
        if len(my_playing) != 0:
            print(my_playing)
            favorite_artist.append(my_playing)

    print(favorite_artist)

    # f = open("favorite_artist.txt", "a")
    # for my_playing in favorite_artist:
    #     for tweet in my_playing:
    #         # 改行は半角スペースに置換
    #         tweet1 = id2status[id].full_text.replace("\n", " ")
    #         # スクリーンネームを正規表現を用いて削除
    #         tweet1 = re.sub(r"@[0-9a-zA-Z_]{1,15} +", "", tweet1)

    #         tweet2 = id2status[rid].full_text.replace("\n", " ")
    #         tweet2 = re.sub(r"@[0-9a-zA-Z_]{1,15} +", "", tweet2)

    #         f.write(tweet1+ "\t" + tweet2 + "\n")
    # f.close()
    # print("Write " + str(len(id2replyid)) + " pairs.")

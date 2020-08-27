# Kento Tanaka
# To encode word and sentences

import tensorflow_hub as hub
import numpy as np
import tensorflow_text

# for avoiding error
import ssl
ssl._create_default_https_context = ssl._create_unverified_context

def cos_sim(v1, v2):
    return np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))

# ベクトル化する関数
embed = hub.load("https://tfhub.dev/google/universal-sentence-encoder-multilingual/3")

artists = ['嵐', 'V6','BTS','乃木坂46', 'AKB48', 'Taylor Swift', 'Ed Sheeran', 'Twice' ]

vectors = embed(artists)
# --------------------------------------------------------------
# 使用例以下

# texts = ["昨日、お笑い番組を見た。", "昨夜、テレビで漫才をやっていた。", "昨日、公園に行った。", "I saw a comedy show last night.", "Yesterday, I went to the park."]
# vectors = embed(texts)

print(artists[0], artists[1], cos_sim(vectors[0], vectors[1]), sep="\t")
print(artists[0], artists[3], cos_sim(vectors[0], vectors[3]), sep="\t")
print(artists[3], artists[4], cos_sim(vectors[3], vectors[4]), sep="\t")
print(artists[0], artists[2], cos_sim(vectors[0], vectors[2]), sep="\t")

print(artists[7], artists[2], cos_sim(vectors[7], vectors[2]), sep="\t")
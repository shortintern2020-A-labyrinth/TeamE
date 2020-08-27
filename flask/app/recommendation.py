# Kento Tanaka
# To recommend related artists

# 使用するライブラリのインポート
import pandas as pd
import numpy as np 
from scipy.sparse import csr_matrix
from sklearn.neighbors import NearestNeighbors

data =  pd.read_csv('rank_t_binary.csv')
data = data.fillna(0)
data.set_index("Name",inplace=True)
data
# Artist = '嵐'
# data.iloc[data.index== Artist].values

# Scikit-learnのライブラリを利用します
# n_neiborsやalgorithm、metricなど重要なアーギュメントを設定しています
knn = NearestNeighbors(n_neighbors=9,algorithm= 'brute', metric= 'cosine')
 
# 前処理したデータセットでモデルを訓練
model_knn = knn.fit(data)

# 「嵐」に対してのオススメのアニメ10個
Artist = '嵐'
 
distance, indice = model_knn.kneighbors(data.iloc[data.index== Artist].values.reshape(1,-1),n_neighbors=5)
for i in range(0, len(distance.flatten())):
    if  i == 0:
        print('Recommendations if you like the artist {0}:\n'.format(data[data.index== Artist].index[0]))
    else:
        print('{0}: {1} with distance: {2}'.format(i,data.index[indice.flatten()[i]],distance.flatten()[i]))
import sys, json, base64, io, colorsys
from PIL import Image
import numpy as np
A = '/tmp/assets/'
MI = A + 'Modern_Interiors_Free_v2.2_2/Modern tiles_Free/'
PC = A + 'Pixel_Crawler_-_Free_Pack_2.11_2/Pixel Crawler - Free Pack/'
TW = A + 'Tiny_Wonder_Forest_1.0/Tiny Wonder Forest 1.0/'
UI = A + 'Tiny_Wonder_UI_Free/Tiny Wonder UI Free/'

def trim(im):
    bb = im.getbbox()
    return im.crop(bb) if bb else im

def crop_t(im, c0, r0, c1, r1):  # tile coords (float) -> trimmed
    return trim(im.crop((int(c0 * 16), int(r0 * 16), int(c1 * 16), int(r1 * 16))))

def hue_shift(im, deg, lo=None, hi=None):
    a = np.array(im.convert('RGBA')).astype(float) / 255
    out = a.copy()
    h, w, _ = a.shape
    for y in range(h):
        for x in range(w):
            if a[y, x, 3] < .5: continue
            hh, l, s = colorsys.rgb_to_hls(*a[y, x, :3])
            if s < .12: continue
            hd = hh * 360
            if lo is not None and not (lo <= hd <= hi): continue
            r, g, b = colorsys.hls_to_rgb(((hd + deg) % 360) / 360, l, s)
            out[y, x, :3] = (r, g, b)
    return Image.fromarray((out * 255).astype('uint8'), 'RGBA')

# ---------- 1. 主圖集 ----------
parts = {}
INT = Image.open(MI + 'Interiors_free/16x16/Interiors_free_16x16.png').convert('RGBA')
I = lambda name, *t: parts.__setitem__(name, crop_t(INT, *t))
I('tableO', 0.7, 10, 3.3, 12.9)
I('tableC', 5.8, 10, 8.2, 12.9)
I('chairF', 4.0, 21.4, 5.05, 23.2)
I('chairR', 5.1, 21.4, 6.0, 23.2)
I('bookA', 5.0, 14.0, 7.0, 16.1)
I('bookB', 5.0, 16.0, 7.0, 18.1)
I('coolA', 2.0, 18.9, 3.05, 20.7)
I('coolB', 3.05, 18.9, 4.0, 20.7)
I('wardA', 7.0, 48.0, 8.95, 51.1)
I('wardB', 9.05, 48.4, 10.95, 51.1)
I('wardC', 11.1, 48.3, 12.95, 51.0)
I('wardD', 13.1, 48.3, 14.95, 51.0)
I('wardE', 7.0, 51.1, 8.95, 54.0)
I('lampB', 12.0, 53.4, 13.0, 55.6)
I('lampR', 11.1, 53.4, 12.0, 55.5)
I('ficus', 10.4, 44.4, 11.8, 47.0)
I('ficus2', 12.0, 45.0, 13.1, 47.0)
I('palm', 13.3, 44.0, 14.9, 46.2)
I('plant3', 0.1, 49.2, 1.1, 50.5)
I('tv', 0.2, 14.5, 1.9, 15.9)
I('sofaG', 0.9, 72.2, 4.1, 74.2)
I('sofaL', 4.0, 72.2, 7.1, 74.2)
I('sofaB', 7.0, 72.2, 10.1, 74.2)
I('sofaP', 7.0, 74.3, 10.1, 76.2)
I('dresser', 5.0, 59.2, 7.05, 61.0)
I('chest', 3.3, 59.2, 4.9, 61.0)
I('mirrorW', 3.0, 66.4, 4.0, 67.9)
I('mirrorS', 9.0, 66.7, 10.1, 69.0)
I('winRed', 7.1, 24.4, 8.7, 25.9)
I('winWhite', 9.1, 24.4, 10.7, 25.9)
I('winCurt', 4.4, 24.3, 6.6, 26.4)
I('locker', 12.0, 40.0, 13.1, 42.4)
I('gshelfA', 10.0, 68.3, 12.0, 70.5)
I('gshelfB', 12.0, 68.3, 14.0, 70.5)
I('gshelfC', 14.0, 68.3, 16.0, 70.5)
I('gshelfD', 10.0, 71.3, 12.0, 73.5)
I('rugR', 7.1, 15.0, 10.9, 17.8)
I('bedT', 5.8, 1.0, 8.4, 3.2)
I('bedW', 5.8, 3.2, 8.4, 5.4)
I('fridgeW', 4.0, 15.9, 4.9, 17.4)
I('cabW', 1.0, 15.9, 4.2, 17.4)
I('globe', 13.3, 36.2, 14.4, 37.9)
I('board', 10.5, 38.8, 12.3, 40.2)
I('chalk', 13.5, 40.3, 15.2, 42.0)
I('deskS', 4.0, 36.0, 6.0, 38.2)
I('schoolD', 2.0, 38.0, 3.3, 39.6)

# 地板／牆壁（Room Builder）
RBI = Image.open(MI + 'Interiors_free/16x16/Room_Builder_free_16x16.png').convert('RGBA')
for i, r in enumerate([5, 7, 9, 11, 13, 15, 17, 19]):
    parts['wl%d' % i] = RBI.crop((1, r * 16 + 4, 47, r * 16 + 32))        # 46x28 牆面（含踢腳板）
for i, r in enumerate([5, 7, 9, 13]):
    parts['fl%d' % i] = RBI.crop((11 * 16, r * 16, 14 * 16, (r + 2) * 16))  # 48x32 地板（磚紅/黃/青/人字拼）
parts['fl4'] = RBI.crop((12 * 16, 12 * 16, 13 * 16, 13 * 16))             # 灰色單塊
# 樹（Pixel Crawler Model_01 Size_02：綠 / 黃 / 橘）
TR = PC + 'Environment/Props/Static/Trees/'
m1 = Image.open(TR + 'Model_01/Size_02.png').convert('RGBA')
parts['treeG'] = trim(m1.crop((32, 2, 64, 64)))
parts['treeY'] = trim(m1.crop((96, 2, 128, 64)))
parts['treeO'] = trim(m1.crop((32, 66, 64, 128)))
parts['treeB'] = trim(m1.crop((161, 17, 187, 64)))      # 光禿
parts['treeP'] = hue_shift(parts['treeO'], -38)          # 櫻花（橘→粉）
m2 = Image.open(TR + 'Model_02/Size_02.png').convert('RGBA')
parts['pineA'] = trim(m2.crop((3, 1, 48, 48)))
parts['pineB'] = trim(m2.crop((67, 1, 112, 48)))
m3 = Image.open(TR + 'Model_03/Size_02.png').convert('RGBA')
parts['pineT'] = trim(m3.crop((0, 5, 30, 80)))
# 地面小花草（Tiny Wonder Forest summer tilemap）
SM = Image.open(TW + 'tilemaps/summer tilemap.png').convert('RGBA')
for i, (c, r) in enumerate([(0, 0), (1, 0), (0, 1), (1, 1), (0, 2), (1, 2)]):
    parts['dec%d' % i] = trim(SM.crop((c * 16, r * 16, c * 16 + 16, r * 16 + 16)))
parts['bushL'] = trim(SM.crop((5 * 16, 2 * 16, 9 * 16 + 8, 4 * 16)))
parts['bushD'] = trim(SM.crop((5 * 16, 4 * 16 + 4, 9 * 16, 7 * 16)))
parts['bushS'] = trim(SM.crop((2 * 16 + 4, 3 * 16 + 4, 4 * 16 + 8, 5 * 16 + 8)))
grass = SM.getpixel((5 * 16 + 8, 8 * 16 + 8))
print('grass base', grass)

# 擠進單一圖集
order = sorted(parts.items(), key=lambda kv: -kv[1].height)
AW = 512
x = y = rowh = 0
meta = {}
placed = []
for n, im in order:
    if x + im.width + 1 > AW:
        x = 0; y += rowh + 1; rowh = 0
    _a = np.array(im.convert('RGBA')).reshape(-1, 4); _a = _a[_a[:, 3] > 200][:, :3]; _av = [int(v) for v in (_a.mean(0) if len(_a) else (128, 128, 128))]
    placed.append((n, im, x, y)); meta[n] = [x, y, im.width, im.height] + _av
    x += im.width + 1; rowh = max(rowh, im.height)
AH = y + rowh + 1
atlas = Image.new('RGBA', (AW, AH), (0, 0, 0, 0))
for n, im, px, py in placed: atlas.paste(im, (px, py))
def b64(im, **kw):
    bf = io.BytesIO(); im.save(bf, 'PNG', optimize=True); return 'data:image/png;base64,' + base64.b64encode(bf.getvalue()).decode()
atlas_uri = b64(atlas)
print('atlas', atlas.size, len(atlas_uri))

# ---------- 2. 角色 ----------
CH = MI + 'Characters_free/'
names = ['Adam', 'Alex', 'Amelia', 'Bob']
sheet = Image.new('RGBA', (384, 32 * 3 * 4), (0, 0, 0, 0))
for i, n in enumerate(names):
    for j, f in enumerate(['_run', '_idle_anim', '_sit']):
        sheet.paste(Image.open(CH + n + f + '_16x16.png').convert('RGBA'), (0, (i * 3 + j) * 32))
chars_uri = b64(sheet)
# 色彩分類：h=髮 s=膚 t=上衣 p=褲
CLS = {
 'Adam': {'h': ['687253', '5d6043', '5f694a', '959d58'], 's': ['ffcbb0', 'f6ae9f', 'ffb893', 'f69784', 'e19b9b', 'd3a38d', 'bba386'], 't': ['805e8e', '9f74a8', '6c5981']},
 'Alex': {'h': ['8d7051', '8a6552', '957350', 'ba8d5e'], 's': ['ffcbb0', 'f6ae9f', 'ffb893', 'f69784', 'e19b9b', 'd3a38d'], 't': ['a2394b', 'ae4a52', '6f494d', '5a444a', '6f5446'], 'p': ['787d93', '8091a5', '9da3b7', '8b8bab']},
 'Amelia': {'h': ['8a6552', '957350', 'ba8d5e', '8d7051', '674d49'], 's': ['bf8b78', 'b57972', 'aa5e56', 'a77a67', 'b58472', 'b2736d'], 't': ['a85377', 'b95d72'], 'p': ['b35e3f', 'ab4a36']},
 'Bob': {'h': ['5d585f', '555157', '716b6e', 'b59e95', 'c9a495', 'a5948f'], 's': ['ffcbb0', 'f6ae9f', 'e19b9b'], 't': ['6c6e85', 'c2b8d5', 'd8d0e0']},
}
# 每類基準色（用來算明暗比例）
REF = {'Adam': {'h': '687253', 's': 'ffcbb0', 't': '805e8e'}, 'Alex': {'h': '8d7051', 's': 'ffcbb0', 't': 'a2394b', 'p': '787d93'},
       'Amelia': {'h': '8a6552', 's': 'bf8b78', 't': 'a85377', 'p': 'b35e3f'}, 'Bob': {'h': '5d585f', 's': 'ffcbb0', 't': '6c6e85'}}

# ---------- 3. UI ----------
ui = {}
BF = Image.open(UI + 'base free.png').convert('RGBA'); BT = Image.open(UI + 'buttons free.png').convert('RGBA'); BR = Image.open(UI + 'bars free.png').convert('RGBA')
ui['pCream'] = b64(BF.crop((9, 9, 39, 39))); ui['pMid'] = b64(BF.crop((9, 57, 39, 87))); ui['pDark'] = b64(BF.crop((9, 105, 39, 135)))
ui['sCream'] = b64(BF.crop((59, 11, 85, 39))); ui['sMid'] = b64(BF.crop((59, 59, 85, 87))); ui['sDark'] = b64(BF.crop((59, 107, 85, 135)))
ui['bCream'] = b64(BT.crop((3, 2, 45, 30))); ui['bMid'] = b64(BT.crop((3, 34, 45, 62))); ui['bDark'] = b64(BT.crop((3, 66, 45, 94)))
ui['bDis'] = b64(BT.crop((51, 4, 93, 30)))
ui['barBg'] = b64(BR.crop((0, 4, 48, 11))); ui['barRed'] = b64(BR.crop((1, 37, 47, 42)))
print({k: len(v) for k, v in ui.items()})

js = 'const ASSET=' + json.dumps({'atlas': atlas_uri, 'meta': meta, 'chars': chars_uri, 'cls': CLS, 'ref': REF, 'grass': list(grass[:3]), 'ui': ui}, separators=(',', ':')) + ';\n'
open('/home/claude/v3/assets.js', 'w').write(js)
atlas.save('/tmp/prev2/atlas.png')
print('assets.js', len(js))

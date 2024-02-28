// src/controllers/screens.js
const express = require('express');
const router = express.Router();

// 模拟数据库存储
let screens = [
    {
        "id": 1,
        "note": "ipad pro 10.5",
        "width": "2224",
        "height": "1668",
        "ppi": 264.76,
        "size": "10.5",
        "sizeWidth": 21.33,
        "sizeHeight": 16,
        "area": 341.28
    },
    {
        "id": 2,
        "note": "MacbookPro 14 2021/2023",
        "width": "3024",
        "height": "1964",
        "ppi": 253.93,
        "size": "14.2",
        "sizeWidth": 30.26,
        "sizeHeight": 19.65,
        "area": 594.61
    },
    {
        "id": 3,
        "note": "MacbookPro 16 2021/2023",
        "width": "3456",
        "height": "2234",
        "ppi": 254.02,
        "size": "16.2",
        "sizeWidth": 34.56,
        "sizeHeight": 22.34,
        "area": 772.07
    },
    {
        "id": 4,
        "note": "MacbookAir 13 m2 2022",
        "width": "2560",
        "height": "1664",
        "ppi": 224.51,
        "size": "13.6",
        "sizeWidth": 28.95,
        "sizeHeight": 18.82,
        "area": 544.84
    },
    {
        "id": 5,
        "note": "MacbookAir 15 m2 2022",
        "width": "2880",
        "height": "1864",
        "ppi": 225.7,
        "size": "15.2",
        "sizeWidth": 32.42,
        "sizeHeight": 20.98,
        "area": 680.17
    },
    {
        "id": 6,
        "note": "ThinkPad x390",
        "width": "1920",
        "height": "1080",
        "ppi": 165.63,
        "size": "13.3",
        "sizeWidth": 29.44,
        "sizeHeight": 16.56,
        "area": 487.53
    },
    {
        "id": 7,
        "note": "ThinkPad e40",
        "width": "1366",
        "height": "768",
        "ppi": 111.94,
        "size": "14",
        "sizeWidth": 31,
        "sizeHeight": 17.43,
        "area": 540.33
    },
    {
        "id": 8,
        "note": "Hornor magicbook 14",
        "width": "2160",
        "height": "1440",
        "ppi": 185.43,
        "size": "14",
        "sizeWidth": 29.59,
        "sizeHeight": 19.73,
        "area": 583.81
    },
    {
        "id": 9,
        "note": "SteamDeck oled",
        "width": "1280",
        "height": "800",
        "ppi": 203.98,
        "size": "7.4",
        "sizeWidth": 15.94,
        "sizeHeight": 9.96,
        "area": 158.76
    }
];
let currentId = 0;

// 计算屏幕信息的辅助函数
const calculateScreenInfo = (width, height, size) => {
    // 计算PPI，并保留两位小数
    const ppi = +(Math.sqrt(width ** 2 + height ** 2) / size).toFixed(2);
  
    // 转换尺寸为厘米（1英寸=2.54厘米），并保留两位小数
    const sizeCm = +(size * 2.54).toFixed(2);
    
    // 使用勾股定理反向计算屏幕的宽和高的比例
    const aspectRatio = width / height;
    
    // 计算屏幕物理尺寸的高度和宽度（厘米），并保留两位小数
    const heightCm = +Math.sqrt((sizeCm ** 2) / (1 + aspectRatio ** 2)).toFixed(2);
    const widthCm = +(heightCm * aspectRatio).toFixed(2);
    
    // 计算面积（平方厘米），并保留两位小数
    const areaSqCm = +(widthCm * heightCm).toFixed(2);
  
    return { ppi, widthCm, heightCm, areaSqCm };
  };

// 添加屏幕信息
router.post('/', (req, res) => {
    const { width, height, size, note } = req.body;
    const { ppi, widthCm, heightCm, areaSqCm } = calculateScreenInfo(width, height, size);
    const newScreen = {
        id: ++currentId,
        note,
        width,
        height,
        ppi,
        size,
        sizeWidth: widthCm,
        sizeHeight: heightCm,
        area: areaSqCm
    };
    screens.push(newScreen);
    res.json(newScreen);
});

// 查询所有屏幕信息
router.get('/', (req, res) => {
    res.json(screens);
});

// 查询单个屏幕信息（根据id）
router.get('/:id', (req, res) => {
    const screen = screens.find(s => s.id === parseInt(req.params.id));
    if (screen) {
        res.json(screen);
    } else {
        res.status(404).send('Screen not found');
    }
});

// 删除屏幕信息
router.delete('/:id', (req, res) => {
    const index = screens.findIndex(s => s.id === parseInt(req.params.id));
    if (index > -1) {
        screens.splice(index, 1);
        res.send('Screen deleted');
    } else {
        res.status(404).send('Screen not found');
    }
});

// 更新屏幕信息
router.put('/:id', (req, res) => {
    const index = screens.findIndex(s => s.id === parseInt(req.params.id));
    if (index > -1) {
        const { width, height, size, note } = req.body;
        const { ppi, areaInSqInch } = calculateScreenInfo(width, height, size);
        screens[index] = { ...screens[index], note, width, height, ppi, size: size, sizeWidth: width, sizeHeight: height, area: areaInSqInch };
        res.json(screens[index]);
    } else {
        res.status(404).send('Screen not found');
    }
});

module.exports = router;

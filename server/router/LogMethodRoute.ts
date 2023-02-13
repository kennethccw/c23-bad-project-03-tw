import express from "express";
import { logMethodController } from "../routes";
import { uploadMiddleware } from "../utils/formidable";


export const logMethodRoutes = express.Router();


logMethodRoutes.get('/diary/today', logMethodController.checkDiary)
logMethodRoutes.get('/diary', logMethodController.createEmotionForDiary)
logMethodRoutes.get('/diary/past/date/:date', logMethodController.showPastDiary)
logMethodRoutes.get('/emoticon/past/date/:date', logMethodController.showPastEmoticon)
logMethodRoutes.post('/diary',uploadMiddleware, logMethodController.createDiary)
logMethodRoutes.put('/diary/date/:date',uploadMiddleware, logMethodController.createDiary)
logMethodRoutes.put('/voiceMemo/date/:date',uploadMiddleware, logMethodController.createVoiceMemo)
logMethodRoutes.post('/emoticon/date/:date', logMethodController.createEmoticon)
logMethodRoutes.post('/voiceMemo', uploadMiddleware, logMethodController.createVoiceMemo)
logMethodRoutes.post('/emoticon', logMethodController.createEmoticon)
logMethodRoutes.put('/emoticon/date/:date', logMethodController.createEmoticon)
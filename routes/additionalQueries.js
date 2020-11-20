const express = require('express');

const router = express.Router();

const mysql = require('mysql2/promise');

const initDb = async () => {
    const db = mysql.createConnection({
        host: 'localhost', 
        user: 'joseph',
        password: 'mysql',
        database: 'db304'
    });
    return db;
}

// Basic Selection Query 

// @route   GET api/queries/playerStats
// @desc    Get all players and their stats for the season
//          in the request body 
// @params  JSON with season 

router.get("/playerStats", async(req, res) => {
    const season = req.query.season; 
    const sql = `SELECT P.p_name, S.season, S.PPG, S.APG, S.FG FROM Players P, Player_Has_Statistics S WHERE P.playerId = S.playerId AND S.season = '${season}'`;
    await executeSql(sql, req, res);
});

// Projection and Join Query 

// @route   GET api/queries/playerOfTeams 
// @desc    Gets players of players of team specified 
//          in request body
// @params  JSON with teamName
router.get("/playersOfTeam", async(req, res) => {
    const teamName = req.query.teamName;
    const sql = `SELECT P.p_name, P.number, P.weight, P.height, PF.teamName FROM Players P, Plays_For PF WHERE P.playerId = PF.playerId AND PF.teamName = "${teamName}"`; 
    await executeSql(sql, req, res);
    
});

// Aggregation with Group By

// @route   GET api/queries/teamPlayerCount
// @desc    Returns the player count for every single team
// @params  None 
router.get("/teamPlayerCount", async(req, res) => {
    const sql = `SELECT PF.teamName, Count(*) FROM Players P, Plays_For PF WHERE P.playerId = PF.playerId GROUP BY PF.teamName`
    await executeSql(sql, req, res);
}); 

const executeSql = async (sql, req, res) => {
    const db = await initDb(); 
    try {
        [results, fields] = await db.execute(sql); 
        console.log(results); 
        res.send(results);
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: "Server Error"});
    }
}

// Aggregation with Having

// @route GET api/queries/statsOverPPG?season=season&minPPG=minPPG
// @desc Returns the name, average FG%, and PPG of players that have PPG>23 given a season
// @params JSON with season

router.get("/statsOverPPG", async(req, res) => {
    const {season, minPPG} = req.query;
    const sql = `SELECT S.season, P.p_name, Avg(S.FG), S.PPG FROM Players P, Player_Has_Statistics S WHERE P.playerId = S.playerId AND S.season = '${season}' GROUP BY P.p_name HAVING S.PPG>${minPPG}`;
    await executeSql(sql, req, res);
});

// Nested Aggregation with Group By

//@route GET api/queries/highestPPGinSeason
//@desc Find the name and PPG of the player with the highest PPG in a season
//@params JSON with season
router.get("/highestPPGinSeason", async(req, res) => {
    const {season} = req.query;
    console.log({season});
    const sql = `SELECT season, P.p_name, Max(S.PPG) FROM Players P, Player_Has_Statistics S WHERE P.playerId = S.playerId AND S.season = '${season}' GROUP BY P.p_name HAVING
    Max(S.PPG) >= ALL ( SELECT Max(S2.PPG) FROM Player_Has_Statistics S2 WHERE S2.season = '${season}')`;
    await executeSql(sql, req, res);
});


//Division

//@route GET/api/queries/mutualCoach
//@desc Find the name of every team that is coached by both coach1 and coach2
//@params JSON with id of 2 coaches, coach1 and coach2
router.get("/mutualCoach", async(req, res) => {
    const coach1 = req.query.coach1;
    const coach2 = req.query.coach2;
    console.log(coach1);
    console.log(coach2);
    let check1 = await coachCheck(coach1);
    if (!check1) {
        return res.status(200).send([]);
    }
    let check2 = await coachCheck(coach2);
    if (!check2) {
        return res.status(200).send([]);
    }
    const sql = `SELECT DISTINCT R.teamName
                 FROM Rosters R
                 WHERE NOT EXISTS (SELECT DISTINCT C.coachId
                                   FROM Coaches C
                                   WHERE C.coachId IN(SELECT C2.coachId
                                     FROM Coach C2
                                     WHERE C2.coachId = ${coach1} OR C2.coachId = ${coach2})
                                   AND NOT EXISTS(
                                      SELECT C1.coachId
                                      FROM Coaches C1
                                      WHERE C.coachId = C1.coachId AND C1.teamName = R.teamName))`;
    await executeSql(sql, req, res);
});

const coachCheck = async (coachId) => {
    let test = `SELECT * FROM Coach C WHERE C.coachId = ${coachId}`; 
    console.log(test);
    const db = await initDb(); 
    let [check, fields] = await db.execute(test); 
    console.log(check);
    return check.length !== 0; 
}




module.exports = router;
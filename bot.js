const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
const mcDataLoader = require('minecraft-data')

const bot = mineflayer.createBot({
  host: 'SEU_SERVIDOR_ATERNOS', // exemplo: 'meuservidor.aternos.me'
  port: 25565,
  username: 'Bot' + Math.floor(Math.random() * 1000),
  auth: 'offline' // modo offline pra Aternos sem conta original
})

bot.loadPlugin(pathfinder)

bot.once('spawn', () => {
  const mcData = mcDataLoader(bot.version)
  const defaultMove = new Movements(bot, mcData)
  bot.pathfinder.setMovements(defaultMove)

  bot.chat('Eae, cheguei no server!')

  setInterval(() => {
    const x = bot.entity.position.x + (Math.random() * 10 - 5)
    const z = bot.entity.position.z + (Math.random() * 10 - 5)
    const y = bot.entity.position.y
    bot.pathfinder.setGoal(new goals.GoalBlock(x, y, z))
  }, 15000)
})

bot.on('chat', (username, message) => {
  if (username === bot.username) return
  const respostas = ['Tô andando por aí...', 'Opa, beleza?', 'Explorando o mapa hehe']
  bot.chat(respostas[Math.floor(Math.random() * respostas.length)])
})
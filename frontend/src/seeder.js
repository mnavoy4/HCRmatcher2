// const axios = require('axios')

// const industries = ['FinTech', 'Healthcare', 'Finance', 'Telecom', 'Linux',
// 'ASIC', 'Cyber Security', 'Defense', 'Aerospace', 'Data Science', 'Machine Learning', 'IT', 'Project Management',
// 'Blockchain', 'Education', 'Oil and Gas', 'Military', 'Publishing', 'Automotive', 'Language Processing']

// const industryObjects = industries.map(industryToMap => {
//   return { industry: industryToMap }
// })




// const postIndustryURL = 'http://localhost:5000/industries/add';

// Promise.all(industryObjects.map(industry => 
//   axios.post(postIndustryURL, industry)
//     .then(console.log('completed'))
//     .catch(error => console.log(error))
// ))







// const skills = [
  // 'HTML/CSS', 'JS', 'Design', 'UX/UI', 'Node.js',
  // 'React', 'Angular', 'Vue', 'Rust',
  // 'C'
  // 'C++', 'C#', '.NET', 'Python', 'Pandas',
  // 'PHP', 'Winforms', 'ASIC', 'Pytorch', 'Tensorflow',
  // 'Redux', 'Express', 'API', 'Backend', 'Frontend',
  // 'Ruby', 'Ruby on Rails', 'SQL', 'MySQL', 'Relational DBs',
  // 'Non-Relational DBs', 'MongoDB', 'DynamoDB', 'Project Management',
  // 'PostgreSQL', 'Haskell', 'Scala', 'Ci/CD'
// ];

// const skillObjects = skills.map(skillToMap => {
//   return { skill: skillToMap }
// })

// const postSkillURL = 'http://localhost:5000/skills/add';

// Promise.all(skillObjects.map(skill => 
//   axios.post(postSkillURL, skill)
//     .then(console.log('completed'))
//     .catch(error => console.log(error))
// ))
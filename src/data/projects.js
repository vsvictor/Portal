export const projects = [
  {
    icon: '📋',
    color: 'linear-gradient(135deg, #1a56a4, #2368c4)',
    status: 'Діє',
    start: '01.03.2023',
    team: [
      { id: 101, fullName: 'Коваленко Олексій Іванович',  position: 'Project Manager' },
      { id: 34,  fullName: 'Савченко Ірина Вікторівна',   position: 'Tech Lead' },
      { id: 58,  fullName: 'Гриценко Павло Сергійович',   position: 'Backend Developer' },
      { id: 72,  fullName: 'Пономаренко Юлія Андріївна',  position: 'Frontend Developer' },
      { id: 91,  fullName: 'Ткаченко Роман Олексійович',  position: 'DevOps Engineer' },
    ],
    category: 'ERP система',
    title: 'Єдина інформаційна система Мінекономіки',
    description:
      'Комплексна ERP-система для автоматизації процесів Міністерства економіки. Охоплює документообіг, планування, звітність та аналітику.',
    tags: ['Java', 'Vue.js', 'PostgreSQL', 'Kubernetes'],
  },
  {
    icon: '📊',
    color: 'linear-gradient(135deg, #2d7d46, #38a169)',
    status: 'Діє',
    start: '15.06.2022',
    team: [
      { id: 214, fullName: 'Бондаренко Марина Василівна', position: 'Project Manager' },
      { id: 47,  fullName: 'Левченко Сергій Миколайович', position: 'Data Engineer' },
      { id: 63,  fullName: 'Мороз Катерина Олегівна',     position: 'Data Analyst' },
    ],
    category: 'Аналітика',
    title: 'Система моніторингу держзакупівель',
    description:
      'Аналітична платформа для моніторингу та аналізу державних закупівель з інтеграцією Prozorro. Забезпечує прозорість витрат.',
    tags: ['Python', 'React', 'Elasticsearch', 'Grafana'],
  },
  {
    icon: '🗂️',
    color: 'linear-gradient(135deg, #6b46c1, #805ad5)',
    status: 'Діє',
    start: '01.02.2022',
    team: [
      { id: 87,  fullName: 'Шевченко Дмитро Олегович',    position: 'Project Manager' },
      { id: 112, fullName: 'Захаренко Ольга Іванівна',    position: 'Business Analyst' },
      { id: 39,  fullName: 'Василенко Артем Юрійович',    position: 'Backend Developer' },
      { id: 55,  fullName: 'Кириленко Наталія Петрівна',  position: 'QA Engineer' },
    ],
    category: 'Документообіг',
    title: 'Електронний документообіг',
    description:
      "Система електронного документообігу з КЕП-підписанням, маршрутизацією документів та інтеграцією з Мін'юстом.",
    tags: ['Spring Boot', 'КЕП', 'REST API', 'Oracle'],
  },
  {
    icon: '📈',
    color: 'linear-gradient(135deg, #c05621, #dd6b20)',
    status: 'Діє',
    start: '10.09.2021',
    team: [
      { id: 56,  fullName: 'Мельник Оксана Петрівна',     position: 'Project Manager' },
      { id: 78,  fullName: 'Дяченко Віталій Романович',   position: 'BI Developer' },
      { id: 130, fullName: 'Супруненко Аліна Сергіївна',  position: 'Data Analyst' },
    ],
    category: 'BI',
    title: 'Платформа бізнес-аналітики',
    description:
      'BI-платформа з інтерактивними дашбордами, автоматичними звітами та прогнозною аналітикою для керівництва Мінекономіки.',
    tags: ['Apache Superset', 'dbt', 'Airflow', 'ClickHouse'],
  },
  {
    icon: '🔐',
    color: 'linear-gradient(135deg, #b83280, #d53f8c)',
    status: 'Діє',
    start: '01.06.2020',
    team: [
      { id: 193, fullName: 'Лисенко Андрій Миколайович',  position: 'Project Manager' },
      { id: 22,  fullName: 'Руденко Максим Олександрович', position: 'Security Engineer' },
      { id: 44,  fullName: 'Тимченко Вікторія Іванівна',  position: 'Penetration Tester' },
      { id: 67,  fullName: 'Білоус Євген Дмитрович',      position: 'SOC Analyst' },
    ],
    category: 'Безпека',
    title: 'Захищений периметр держсистем',
    description:
      'Комплексна система кібербезпеки з SIEM, IDS/IPS, двофакторною автентифікацією та моніторингом загроз.',
    tags: ['SIEM', 'IDS', '2FA', 'Zero Trust'],
  },
]

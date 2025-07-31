// Karanwal Capital Investment Game - Main JavaScript

class InvestmentGame {
    constructor() {
        this.gameState = {
            fundSize: 10000000,
            cashReserves: 10000000,
            reputation: 50,
            currentMonth: 1,
            totalMonths: 12,
            portfolio: [],
            completedInvestments: [],
            gameSpeed: 1,
            cycleNumber: 1,
            gameStarted: false
        };
        
        this.startups = [];
        this.newsItems = [];
        this.activeModal = null;
        this.gameTimer = null;
        this.chart = null;
        this.currentStartup = null;
        
        // Game configuration
        this.config = {
            initialFundSize: 10000000,
            initialReputation: 50,
            cycleDurationMonths: 12,
            maxInvestmentsPerCycle: 15,
            industries: ["Fintech", "Healthtech", "AI/ML", "Green Energy", "Edtech", "Agritech", "Web3/Crypto", "E-commerce", "SaaS", "Biotech", "Foodtech", "Mobility"],
            countries: [
                {name: "USA", riskMultiplier: 1.0, currency: "USD"},
                {name: "India", riskMultiplier: 1.2, currency: "INR"},
                {name: "China", riskMultiplier: 1.3, currency: "CNY"},
                {name: "UK", riskMultiplier: 1.0, currency: "GBP"},
                {name: "Germany", riskMultiplier: 0.9, currency: "EUR"},
                {name: "Singapore", riskMultiplier: 0.8, currency: "SGD"},
                {name: "Brazil", riskMultiplier: 1.4, currency: "BRL"},
                {name: "Nigeria", riskMultiplier: 1.6, currency: "NGN"}
            ],
            stages: [
                {name: "Pre-seed", avgValuation: 2000000, riskLevel: "Very High"},
                {name: "Seed", avgValuation: 8000000, riskLevel: "High"},
                {name: "Series A", avgValuation: 25000000, riskLevel: "Medium"},
                {name: "Series B", avgValuation: 75000000, riskLevel: "Medium-Low"},
                {name: "Late Stage", avgValuation: 200000000, riskLevel: "Low"}
            ]
        };
    }
    
    init() {
        console.log('Initializing game...');
        this.generateStartups();
        this.setupEventListeners();
        this.loadGameState();
        this.updateUI();
        this.renderStartups(); // Render startups on initial load
        this.showWelcomeMessage();
        console.log('Game initialized with', this.startups.length, 'startups');
    }
    
    generateStartups() {
        console.log('Generating startups...');
        const startupNames = [
            "NeuralFlow", "GreenVault", "MediCore", "CryptoLend", "EduTech Plus", "AgriSmart", "FinanceAI", "HealthBot",
            "ClimateX", "DataMind", "BioGenix", "FoodTech", "MobilityNow", "CloudSecure", "VirtualMed", "EcoEnergy",
            "SmartFarm", "QuantumPay", "LearnFast", "GreenMobility", "AIHealth", "BlockTrade", "FoodChain", "TechMed",
            "CyberGuard", "CleanTech", "BioSafe", "AutoDrive", "SmartGrid", "HealthStream", "EduVR", "FinBot",
            "GreenPay", "MedTech", "AgriBot", "CryptoSafe", "DataStream", "BioTech", "CleanEnergy", "SmartHealth",
            "TechEdu", "GreenFinance", "MediBot", "AgriTech", "BlockHealth", "EcoMobility", "AIEducation", "FinanceBot"
        ];
        
        const descriptions = [
            "Revolutionizing healthcare with AI-powered diagnostic tools",
            "Sustainable energy solutions for smart cities",
            "Next-generation fintech platform for emerging markets",
            "Blockchain-based supply chain transparency",
            "Personalized learning platform using machine learning",
            "IoT sensors for precision agriculture",
            "Decentralized finance protocols for institutional investors",
            "Telemedicine platform connecting rural patients with specialists",
            "Carbon capture technology for industrial applications",
            "Real-time data analytics for enterprise customers",
            "Gene therapy solutions for rare diseases",
            "Plant-based protein alternatives",
            "Autonomous vehicle software platform",
            "Cybersecurity solutions for cloud infrastructure",
            "Virtual reality training programs for medical professionals",
            "Renewable energy storage systems",
            "Drone-based crop monitoring and management",
            "Cryptocurrency payment processing for merchants",
            "Adaptive learning software for K-12 education",
            "Electric vehicle charging network"
        ];
        
        const founderNames = [
            "Sarah Chen", "Michael Rodriguez", "Priya Patel", "David Kim", "Maria Santos", "James Wilson",
            "Lisa Zhang", "Ahmed Hassan", "Emma Thompson", "Carlos Mendez", "Aisha Johnson", "Robert Lee",
            "Fatima Al-Rashid", "Kevin O'Connor", "Yuki Tanaka", "Isabella Garcia", "Thomas Mueller",
            "Nkem Okoro", "Sophie Laurent", "Raj Gupta", "Ana Sokolova", "Omar Malik", "Grace Liu",
            "Marco Rossi", "Adaora Nwankwo", "Jean-Pierre Dubois", "Sakura Yamamoto", "Luis Herrera"
        ];
        
        this.startups = []; // Clear existing startups
        
        for (let i = 0; i < 30; i++) { // Generate 30 startups for good variety
            const country = this.config.countries[Math.floor(Math.random() * this.config.countries.length)];
            const stage = this.config.stages[Math.floor(Math.random() * this.config.stages.length)];
            const industry = this.config.industries[Math.floor(Math.random() * this.config.industries.length)];
            const isSocialImpact = Math.random() < 0.3;
            
            const baseValuation = stage.avgValuation * (0.5 + Math.random() * 1.5);
            const fundingAsk = baseValuation * (0.1 + Math.random() * 0.4);
            const revenue = Math.random() < 0.7 ? baseValuation * (0.01 + Math.random() * 0.5) : 0;
            const burnRate = fundingAsk * (0.05 + Math.random() * 0.15);
            
            const startup = {
                id: i + 1,
                name: startupNames[i % startupNames.length] + (i >= startupNames.length ? ` ${Math.floor(i / startupNames.length) + 1}` : ''),
                industry,
                country: country.name,
                stage: stage.name,
                valuation: Math.round(baseValuation),
                fundingAsk: Math.round(fundingAsk),
                description: descriptions[Math.floor(Math.random() * descriptions.length)],
                founderName: founderNames[Math.floor(Math.random() * founderNames.length)],
                founderBio: this.generateFounderBio(),
                revenue: Math.round(revenue),
                burnRate: Math.round(burnRate / 12), // Monthly burn rate
                runway: revenue > 0 ? Math.round(fundingAsk / (burnRate / 12)) : Math.round(fundingAsk / (burnRate / 12)),
                employees: Math.round(5 + Math.random() * 200),
                founded: 2020 + Math.floor(Math.random() * 4),
                socialImpact: isSocialImpact,
                riskFactors: this.generateRiskFactors(),
                strengths: this.generateStrengths(),
                available: true,
                successProbability: this.calculateSuccessProbability(stage.name, country.riskMultiplier, isSocialImpact)
            };
            
            this.startups.push(startup);
        }
        console.log('Generated', this.startups.length, 'startups');
    }
    
    generateFounderBio() {
        const bios = [
            "Former Google engineer with 10+ years in machine learning and AI development.",
            "Serial entrepreneur with two successful exits in the fintech space.",
            "PhD in Computer Science from MIT, specializing in blockchain technology.",
            "Ex-McKinsey consultant with deep expertise in healthcare and biotechnology.",
            "Former Tesla executive with extensive experience in clean energy and sustainability.",
            "Stanford MBA with background in venture capital and startup investments.",
            "Former Microsoft product manager with expertise in enterprise software.",
            "Medical doctor turned entrepreneur, focused on digital health solutions.",
            "Ex-Goldman Sachs analyst with deep understanding of financial markets.",
            "Former Uber engineering lead with experience scaling global platforms."
        ];
        return bios[Math.floor(Math.random() * bios.length)];
    }
    
    generateRiskFactors() {
        const risks = [
            "High customer acquisition costs",
            "Regulatory uncertainty in target markets",
            "Strong competition from established players",
            "Dependence on key partnerships",
            "Technology scalability challenges",
            "Limited intellectual property protection",
            "High cash burn rate",
            "Unproven business model",
            "Market adoption uncertainty",
            "Key person dependency"
        ];
        const numRisks = 2 + Math.floor(Math.random() * 3);
        return this.shuffleArray(risks).slice(0, numRisks);
    }
    
    generateStrengths() {
        const strengths = [
            "Strong technical team",
            "Proven market traction",
            "Strategic partnerships",
            "Proprietary technology",
            "Large addressable market",
            "Experienced leadership",
            "Strong unit economics",
            "First-mover advantage",
            "Defensible moat",
            "Recurring revenue model"
        ];
        const numStrengths = 2 + Math.floor(Math.random() * 3);
        return this.shuffleArray(strengths).slice(0, numStrengths);
    }
    
    calculateSuccessProbability(stage, riskMultiplier, socialImpact) {
        let baseProbability;
        switch(stage) {
            case "Pre-seed": baseProbability = 0.05; break;
            case "Seed": baseProbability = 0.08; break;
            case "Series A": baseProbability = 0.12; break;
            case "Series B": baseProbability = 0.18; break;
            case "Late Stage": baseProbability = 0.25; break;
            default: baseProbability = 0.1;
        }
        
        // Adjust for risk and social impact
        baseProbability *= (2 - riskMultiplier);
        if (socialImpact) baseProbability *= 1.1;
        
        return Math.min(0.4, Math.max(0.02, baseProbability));
    }
    
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    
    setupEventListeners() {
        console.log('Setting up event listeners...');
        
        // Tab navigation - Fixed implementation
        document.querySelectorAll('.kc-game-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                const tabName = e.currentTarget.dataset.tab;
                console.log('Tab clicked:', tabName);
                this.switchTab(tabName);
            });
        });
        
        // Modal close functionality
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('kc-game-modal-close')) {
                this.closeModal();
            }
        });
        
        // Investment modal controls
        this.setupInvestmentControls();
        this.setupGameControls();
        this.setupModalButtons();
        
        console.log('Event listeners set up');
    }
    
    setupInvestmentControls() {
        const investmentAmount = document.getElementById('investment-amount');
        if (investmentAmount) {
            investmentAmount.addEventListener('input', () => {
                this.updateInvestmentSummary();
            });
        }
        
        const investmentType = document.getElementById('investment-type');
        if (investmentType) {
            investmentType.addEventListener('change', () => {
                this.updateInvestmentSummary();
            });
        }
        
        const makeInvestmentBtn = document.getElementById('make-investment');
        if (makeInvestmentBtn) {
            makeInvestmentBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.makeInvestment();
            });
        }
        
        const cancelInvestmentBtn = document.getElementById('cancel-investment');
        if (cancelInvestmentBtn) {
            cancelInvestmentBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeModal();
            });
        }
        
        // Due diligence buttons
        ['review-financials', 'founder-interview', 'market-analysis'].forEach(id => {
            const btn = document.getElementById(id);
            if (btn) {
                const type = id.replace('review-', '').replace('founder-', '').replace('market-', '');
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.performDueDiligence(type === 'financials' ? 'financials' : type === 'interview' ? 'interview' : 'market');
                });
            }
        });
    }
    
    setupGameControls() {
        const gameSpeedSelect = document.getElementById('game-speed');
        if (gameSpeedSelect) {
            gameSpeedSelect.addEventListener('change', (e) => {
                this.gameState.gameSpeed = parseInt(e.target.value);
                this.saveGameState();
                if (this.gameState.gameStarted) {
                    this.startGameLoop();
                }
            });
        }
        
        const saveGameBtn = document.getElementById('save-game');
        if (saveGameBtn) {
            saveGameBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.saveGameState();
                this.showNotification('Game saved successfully!', 'success');
            });
        }
        
        const loadGameBtn = document.getElementById('load-game');
        if (loadGameBtn) {
            loadGameBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.loadGameState();
                this.updateUI();
                this.showNotification('Game loaded successfully!', 'success');
            });
        }
        
        const resetGameBtn = document.getElementById('reset-game');
        if (resetGameBtn) {
            resetGameBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (confirm('Are you sure you want to reset the game? All progress will be lost.')) {
                    this.resetGame();
                }
            });
        }
        
        // Filters
        ['industry-filter', 'stage-filter', 'country-filter'].forEach(id => {
            const filter = document.getElementById(id);
            if (filter) {
                filter.addEventListener('change', () => {
                    this.filterStartups();
                });
            }
        });
    }
    
    setupModalButtons() {
        const newCycleBtn = document.getElementById('new-cycle');
        if (newCycleBtn) {
            newCycleBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.startNewCycle();
            });
        }
        
        const continueGameBtn = document.getElementById('continue-game');
        if (continueGameBtn) {
            continueGameBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.closeModal();
            });
        }
        
        const acknowledgeEventBtn = document.getElementById('acknowledge-event');
        if (acknowledgeEventBtn) {
            acknowledgeEventBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.closeModal();
            });
        }
        
        // Click outside modal to close
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('kc-game-modal') && !e.target.classList.contains('hidden')) {
                this.closeModal();
            }
        });
    }
    
    switchTab(tabName) {
        console.log('Switching to tab:', tabName);
        
        // Remove active class from all tabs
        document.querySelectorAll('.kc-game-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Add active class to clicked tab
        const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }
        
        // Hide all tab content
        document.querySelectorAll('.kc-game-tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Show selected tab content
        const activeContent = document.getElementById(`tab-${tabName}`);
        if (activeContent) {
            activeContent.classList.add('active');
            console.log('Activated content for:', tabName);
        } else {
            console.error('Content not found for tab:', tabName);
        }
        
        // Update specific content based on tab
        switch(tabName) {
            case 'startups':
                this.renderStartups();
                break;
            case 'portfolio':
                this.renderPortfolio();
                break;
            case 'dashboard':
                this.renderDashboard();
                break;
            case 'news':
                this.renderNews();
                break;
        }
        
        console.log('Tab switch completed for:', tabName);
    }
    
    renderStartups() {
        console.log('Rendering startups...');
        const grid = document.getElementById('startup-grid');
        if (!grid) {
            console.error('Startup grid element not found');
            return;
        }
        
        const availableStartups = this.startups.filter(s => s.available);
        console.log('Available startups:', availableStartups.length);
        
        if (availableStartups.length === 0) {
            grid.innerHTML = `
                <div class="card">
                    <div class="card__body">
                        <p>No startups currently available. Check back later or start a new cycle!</p>
                        <button class="btn btn--primary" onclick="game.resetGame()">Reset Game</button>
                    </div>
                </div>
            `;
            return;
        }
        
        grid.innerHTML = availableStartups.map(startup => `
            <div class="kc-game-startup-card" onclick="game.showStartupDetails(${startup.id})" style="cursor: pointer;">
                <div class="kc-game-startup-card-header">
                    <h3 class="kc-game-startup-name">${startup.name}</h3>
                    ${startup.socialImpact ? '<span class="kc-game-startup-badge social-impact">Impact</span>' : '<span class="kc-game-startup-badge">Growth</span>'}
                </div>
                <div class="kc-game-startup-meta">
                    <span class="kc-game-startup-industry">${startup.industry}</span>
                    <span class="kc-game-startup-stage">${startup.stage}</span>
                    <span class="kc-game-startup-country">${startup.country}</span>
                </div>
                <p class="kc-game-startup-description">${startup.description}</p>
                <div class="kc-game-startup-metrics">
                    <div class="kc-game-startup-metric">
                        <span class="kc-game-metric-label">Valuation</span>
                        <span class="kc-game-metric-value">$${this.formatNumber(startup.valuation)}</span>
                    </div>
                    <div class="kc-game-startup-metric">
                        <span class="kc-game-metric-label">Funding Ask</span>
                        <span class="kc-game-metric-value">$${this.formatNumber(startup.fundingAsk)}</span>
                    </div>
                    <div class="kc-game-startup-metric">
                        <span class="kc-game-metric-label">Revenue</span>
                        <span class="kc-game-metric-value">$${this.formatNumber(startup.revenue)}</span>
                    </div>
                    <div class="kc-game-startup-metric">
                        <span class="kc-game-metric-label">Stage</span>
                        <span class="kc-game-metric-value">${startup.stage}</span>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Populate filters
        this.populateFilters();
        console.log('Startups rendered successfully');
    }
    
    populateFilters() {
        const industryFilter = document.getElementById('industry-filter');
        const stageFilter = document.getElementById('stage-filter');
        const countryFilter = document.getElementById('country-filter');
        
        if (!industryFilter || !stageFilter || !countryFilter) return;
        
        // Get unique values
        const industries = [...new Set(this.startups.map(s => s.industry))].sort();
        const stages = [...new Set(this.startups.map(s => s.stage))].sort();
        const countries = [...new Set(this.startups.map(s => s.country))].sort();
        
        // Populate filters
        industryFilter.innerHTML = '<option value="">All Industries</option>' + 
            industries.map(industry => `<option value="${industry}">${industry}</option>`).join('');
        
        stageFilter.innerHTML = '<option value="">All Stages</option>' + 
            stages.map(stage => `<option value="${stage}">${stage}</option>`).join('');
        
        countryFilter.innerHTML = '<option value="">All Countries</option>' + 
            countries.map(country => `<option value="${country}">${country}</option>`).join('');
    }
    
    filterStartups() {
        const industryFilter = document.getElementById('industry-filter');
        const stageFilter = document.getElementById('stage-filter');
        const countryFilter = document.getElementById('country-filter');
        
        if (!industryFilter || !stageFilter || !countryFilter) return;
        
        const industryValue = industryFilter.value;
        const stageValue = stageFilter.value;
        const countryValue = countryFilter.value;
        
        const filteredStartups = this.startups.filter(startup => {
            return startup.available &&
                   (!industryValue || startup.industry === industryValue) &&
                   (!stageValue || startup.stage === stageValue) &&
                   (!countryValue || startup.country === countryValue);
        });
        
        const grid = document.getElementById('startup-grid');
        if (!grid) return;
        
        if (filteredStartups.length === 0) {
            grid.innerHTML = '<div class="card"><div class="card__body"><p>No startups match the selected filters.</p></div></div>';
            return;
        }
        
        grid.innerHTML = filteredStartups.map(startup => `
            <div class="kc-game-startup-card" onclick="game.showStartupDetails(${startup.id})" style="cursor: pointer;">
                <div class="kc-game-startup-card-header">
                    <h3 class="kc-game-startup-name">${startup.name}</h3>
                    ${startup.socialImpact ? '<span class="kc-game-startup-badge social-impact">Impact</span>' : '<span class="kc-game-startup-badge">Growth</span>'}
                </div>
                <div class="kc-game-startup-meta">
                    <span class="kc-game-startup-industry">${startup.industry}</span>
                    <span class="kc-game-startup-stage">${startup.stage}</span>
                    <span class="kc-game-startup-country">${startup.country}</span>
                </div>
                <p class="kc-game-startup-description">${startup.description}</p>
                <div class="kc-game-startup-metrics">
                    <div class="kc-game-startup-metric">
                        <span class="kc-game-metric-label">Valuation</span>
                        <span class="kc-game-metric-value">$${this.formatNumber(startup.valuation)}</span>
                    </div>
                    <div class="kc-game-startup-metric">
                        <span class="kc-game-metric-label">Funding Ask</span>
                        <span class="kc-game-metric-value">$${this.formatNumber(startup.fundingAsk)}</span>
                    </div>
                    <div class="kc-game-startup-metric">
                        <span class="kc-game-metric-label">Revenue</span>
                        <span class="kc-game-metric-value">$${this.formatNumber(startup.revenue)}</span>
                    </div>
                    <div class="kc-game-startup-metric">
                        <span class="kc-game-metric-label">Stage</span>
                        <span class="kc-game-metric-value">${startup.stage}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    showStartupDetails(startupId) {
        console.log('Showing startup details for ID:', startupId);
        const startup = this.startups.find(s => s.id === startupId);
        if (!startup) {
            console.error('Startup not found:', startupId);
            return;
        }
        
        // Populate modal with startup details
        const elements = {
            'startup-modal-name': startup.name,
            'startup-modal-industry': startup.industry,
            'startup-modal-stage': startup.stage,
            'startup-modal-country': startup.country,
            'startup-modal-description': startup.description,
            'startup-modal-valuation': '$' + this.formatNumber(startup.valuation),
            'startup-modal-funding': '$' + this.formatNumber(startup.fundingAsk),
            'startup-modal-revenue': '$' + this.formatNumber(startup.revenue),
            'startup-modal-burn': '$' + this.formatNumber(startup.burnRate) + '/month',
            'startup-modal-founder': startup.founderName,
            'startup-modal-founder-bio': startup.founderBio
        };
        
        // Set all elements
        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        });
        
        // Set up investment controls
        const investmentSlider = document.getElementById('investment-amount');
        if (investmentSlider) {
            const maxInvestment = Math.min(startup.fundingAsk, this.gameState.cashReserves);
            investmentSlider.max = maxInvestment;
            investmentSlider.min = Math.min(100000, maxInvestment);
            investmentSlider.value = Math.min(500000, maxInvestment);
        }
        
        this.currentStartup = startup;
        this.updateInvestmentSummary();
        this.showModal('investment-modal');
    }
    
    updateInvestmentSummary() {
        if (!this.currentStartup) return;
        
        const investmentAmountSlider = document.getElementById('investment-amount');
        const investmentTypeSelect = document.getElementById('investment-type');
        
        if (!investmentAmountSlider || !investmentTypeSelect) return;
        
        const investmentAmount = parseInt(investmentAmountSlider.value);
        const investmentType = investmentTypeSelect.value;
        
        const investmentAmountDisplay = document.getElementById('investment-amount-display');
        if (investmentAmountDisplay) {
            investmentAmountDisplay.textContent = '$' + this.formatNumber(investmentAmount);
        }
        
        const equityPercentageElement = document.getElementById('equity-percentage');
        const postMoneyValuationElement = document.getElementById('post-money-valuation');
        
        if (investmentType === 'equity') {
            const equityPercentage = (investmentAmount / this.currentStartup.valuation * 100).toFixed(2);
            const postMoneyValuation = this.currentStartup.valuation + investmentAmount;
            
            if (equityPercentageElement) {
                equityPercentageElement.textContent = equityPercentage + '%';
            }
            if (postMoneyValuationElement) {
                postMoneyValuationElement.textContent = '$' + this.formatNumber(postMoneyValuation);
            }
        } else if (investmentType === 'debt') {
            if (equityPercentageElement) {
                equityPercentageElement.textContent = '0% (Debt)';
            }
            if (postMoneyValuationElement) {
                postMoneyValuationElement.textContent = '7% Interest';
            }
        } else if (investmentType === 'convertible') {
            if (equityPercentageElement) {
                equityPercentageElement.textContent = 'Convertible';
            }
            if (postMoneyValuationElement) {
                postMoneyValuationElement.textContent = '20% Discount';
            }
        }
    }
    
    performDueDiligence(type) {
        const costs = { financials: 10000, interview: 5000, market: 15000 };
        const cost = costs[type];
        
        if (this.gameState.cashReserves < cost) {
            this.showNotification('Insufficient cash for due diligence!', 'error');
            return;
        }
        
        this.gameState.cashReserves -= cost;
        
        let insight = '';
        switch(type) {
            case 'financials':
                insight = Math.random() < 0.5 ? 
                    'Financial review reveals strong unit economics and healthy cash flow.' :
                    'Financial review shows concerning burn rate and limited revenue growth.';
                break;
            case 'interview':
                insight = Math.random() < 0.5 ?
                    'Founder demonstrates deep market knowledge and clear vision.' :
                    'Founder shows uncertainty about key business metrics and strategy.';
                break;
            case 'market':
                insight = Math.random() < 0.5 ?
                    'Market analysis confirms large addressable market with growing demand.' :
                    'Market analysis reveals intense competition and potential regulatory risks.';
                break;
        }
        
        this.showNotification(insight, 'info');
        this.updateUI();
    }
    
    makeInvestment() {
        if (!this.currentStartup) return;
        
        const investmentAmountSlider = document.getElementById('investment-amount');
        const investmentTypeSelect = document.getElementById('investment-type');
        
        if (!investmentAmountSlider || !investmentTypeSelect) return;
        
        const investmentAmount = parseInt(investmentAmountSlider.value);
        const investmentType = investmentTypeSelect.value;
        
        if (investmentAmount > this.gameState.cashReserves) {
            this.showNotification('Insufficient cash reserves!', 'error');
            return;
        }
        
        if (this.gameState.portfolio.length >= this.config.maxInvestmentsPerCycle) {
            this.showNotification('Maximum investments per cycle reached!', 'error');
            return;
        }
        
        // Create investment record
        const investment = {
            id: Date.now(),
            startupId: this.currentStartup.id,
            startupName: this.currentStartup.name,
            amount: investmentAmount,
            type: investmentType,
            month: this.gameState.currentMonth,
            equityPercentage: investmentType === 'equity' ? (investmentAmount / this.currentStartup.valuation * 100) : 0,
            currentValue: investmentAmount,
            status: 'active',
            industry: this.currentStartup.industry,
            country: this.currentStartup.country,
            socialImpact: this.currentStartup.socialImpact
        };
        
        // Update game state
        this.gameState.cashReserves -= investmentAmount;
        this.gameState.portfolio.push(investment);
        
        // Mark startup as unavailable
        this.currentStartup.available = false;
        
        // Reputation boost for social impact investments
        if (this.currentStartup.socialImpact) {
            this.gameState.reputation += 2;
        }
        
        // Start game loop if first investment
        if (!this.gameState.gameStarted) {
            this.gameState.gameStarted = true;
            this.startGameLoop();
        }
        
        this.saveGameState();
        this.updateUI();
        this.showNotification(`Investment of $${this.formatNumber(investmentAmount)} made in ${this.currentStartup.name}!`, 'success');
        this.closeModal();
        
        // Add news item
        this.addNewsItem(`Karanwal Capital invests $${this.formatNumber(investmentAmount)} in ${this.currentStartup.name}`, 
                        `The ${this.currentStartup.industry} startup from ${this.currentStartup.country} will use the funding to expand operations.`);
    }
    
    renderPortfolio() {
        const grid = document.getElementById('portfolio-grid');
        if (!grid) return;
        
        if (this.gameState.portfolio.length === 0) {
            grid.innerHTML = '<div class="card"><div class="card__body"><p>No investments yet. Visit the Startups tab to make your first investment!</p></div></div>';
            return;
        }
        
        grid.innerHTML = this.gameState.portfolio.map(investment => {
            const returnMultiple = investment.currentValue / investment.amount;
            const returnClass = returnMultiple > 1.1 ? 'positive' : returnMultiple < 0.9 ? 'negative' : 'neutral';
            const returnText = returnMultiple > 1 ? `+${((returnMultiple - 1) * 100).toFixed(1)}%` : 
                              returnMultiple < 1 ? `-${((1 - returnMultiple) * 100).toFixed(1)}%` : '0%';
            
            return `
                <div class="kc-game-portfolio-item">
                    <div class="kc-game-portfolio-item-header">
                        <h4>${investment.startupName}</h4>
                        <span class="kc-game-portfolio-return ${returnClass}">${returnText}</span>
                    </div>
                    <div class="kc-game-startup-meta">
                        <span class="kc-game-startup-industry">${investment.industry}</span>
                        <span class="kc-game-startup-country">${investment.country}</span>
                        ${investment.socialImpact ? '<span class="kc-game-startup-badge social-impact">Impact</span>' : ''}
                    </div>
                    <div class="kc-game-startup-metrics">
                        <div class="kc-game-startup-metric">
                            <span class="kc-game-metric-label">Invested</span>
                            <span class="kc-game-metric-value">$${this.formatNumber(investment.amount)}</span>
                        </div>
                        <div class="kc-game-startup-metric">
                            <span class="kc-game-metric-label">Current Value</span>
                            <span class="kc-game-metric-value">$${this.formatNumber(investment.currentValue)}</span>
                        </div>
                        <div class="kc-game-startup-metric">
                            <span class="kc-game-metric-label">Type</span>
                            <span class="kc-game-metric-value">${investment.type}</span>
                        </div>
                        <div class="kc-game-startup-metric">
                            <span class="kc-game-metric-label">Status</span>
                            <span class="kc-game-metric-value">${investment.status}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        this.updatePortfolioSummary();
    }
    
    updatePortfolioSummary() {
        const totalInvested = this.gameState.portfolio.reduce((sum, inv) => sum + inv.amount, 0);
        const currentValue = this.gameState.portfolio.reduce((sum, inv) => sum + inv.currentValue, 0);
        const roi = totalInvested > 0 ? ((currentValue - totalInvested) / totalInvested * 100) : 0;
        
        const elements = {
            'total-invested': '$' + this.formatNumber(totalInvested),
            'portfolio-value': '$' + this.formatNumber(currentValue),
            'portfolio-roi': roi.toFixed(1) + '%'
        };
        
        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        });
    }
    
    renderDashboard() {
        this.updatePortfolioChart();
        this.updatePerformanceMetrics();
    }
    
    updatePortfolioChart() {
        const ctx = document.getElementById('portfolio-chart');
        if (!ctx) return;
        
        const context = ctx.getContext('2d');
        
        if (this.chart) {
            this.chart.destroy();
        }
        
        if (this.gameState.portfolio.length === 0) {
            context.fillStyle = '#666';
            context.font = '16px Arial';
            context.textAlign = 'center';
            context.fillText('No investments yet', ctx.width / 2, ctx.height / 2);
            return;
        }
        
        const industryData = {};
        this.gameState.portfolio.forEach(investment => {
            if (!industryData[investment.industry]) {
                industryData[investment.industry] = 0;
            }
            industryData[investment.industry] += investment.currentValue;
        });
        
        const colors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B'];
        
        this.chart = new Chart(context, {
            type: 'doughnut',
            data: {
                labels: Object.keys(industryData),
                datasets: [{
                    data: Object.values(industryData),
                    backgroundColor: colors.slice(0, Object.keys(industryData).length),
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    updatePerformanceMetrics() {
        const totalInvestments = this.gameState.portfolio.length + this.gameState.completedInvestments.length;
        const activeInvestments = this.gameState.portfolio.length;
        const successfulInvestments = this.gameState.completedInvestments.filter(inv => inv.currentValue > inv.amount * 1.5).length;
        const successRate = totalInvestments > 0 ? (successfulInvestments / totalInvestments * 100) : 0;
        
        const totalInvested = [...this.gameState.portfolio, ...this.gameState.completedInvestments]
            .reduce((sum, inv) => sum + inv.amount, 0);
        const totalValue = [...this.gameState.portfolio, ...this.gameState.completedInvestments]
            .reduce((sum, inv) => sum + inv.currentValue, 0);
        const avgReturn = totalInvested > 0 ? (totalValue / totalInvested) : 1;
        
        const elements = {
            'total-investments': totalInvestments.toString(),
            'active-investments': activeInvestments.toString(),
            'success-rate': successRate.toFixed(1) + '%',
            'avg-return': avgReturn.toFixed(1) + 'x'
        };
        
        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        });
    }
    
    renderNews() {
        const feed = document.getElementById('news-feed');
        if (!feed) return;
        
        if (this.newsItems.length === 0) {
            feed.innerHTML = '<div class="card"><div class="card__body"><p>No news items yet. News will appear as you play the game.</p></div></div>';
            return;
        }
        
        feed.innerHTML = this.newsItems.map(news => `
            <div class="kc-game-news-item">
                <div class="kc-game-news-item-header">
                    <h4 class="kc-game-news-title">${news.title}</h4>
                    <span class="kc-game-news-date">Month ${news.month}</span>
                </div>
                <p class="kc-game-news-content">${news.content}</p>
                ${news.impact ? `<div class="kc-game-news-impact ${news.impact > 0 ? 'positive' : 'negative'}">${news.impact > 0 ? '📈' : '📉'} ${news.impactText}</div>` : ''}
            </div>
        `).join('');
    }
    
    addNewsItem(title, content, impact = null, impactText = '') {
        this.newsItems.unshift({
            id: Date.now(),
            title,
            content,
            month: this.gameState.currentMonth,
            impact,
            impactText
        });
        
        // Keep only last 50 news items
        if (this.newsItems.length > 50) {
            this.newsItems = this.newsItems.slice(0, 50);
        }
        
        // Update news ticker
        this.updateNewsTicker(title);
    }
    
    updateNewsTicker(message) {
        const ticker = document.querySelector('.kc-game-news-content');
        if (ticker) {
            ticker.textContent = message;
        }
    }
    
    startGameLoop() {
        if (this.gameTimer) {
            clearInterval(this.gameTimer);
        }
        
        // Only start game loop if game has actually started (first investment made)
        if (!this.gameState.gameStarted) {
            return;
        }
        
        this.gameTimer = setInterval(() => {
            this.gameStep();
        }, 5000 / this.gameState.gameSpeed); // 5 seconds per month at normal speed
    }
    
    gameStep() {
        if (this.gameState.currentMonth >= this.config.cycleDurationMonths) {
            this.endCycle();
            return;
        }
        
        this.gameState.currentMonth++;
        
        // Update portfolio valuations
        this.updatePortfolioValuations();
        
        // Generate random events
        if (Math.random() < 0.2) {
            this.generateRandomEvent();
        }
        
        // Process startup outcomes
        this.processStartupOutcomes();
        
        this.updateUI();
        this.saveGameState();
    }
    
    updatePortfolioValuations() {
        this.gameState.portfolio.forEach(investment => {
            // Natural valuation growth/decline
            const growthRate = -0.05 + Math.random() * 0.15; // -5% to +10% per month
            investment.currentValue *= (1 + growthRate);
            investment.currentValue = Math.max(0, investment.currentValue);
        });
    }
    
    generateRandomEvent() {
        const events = [
            {
                type: 'market',
                title: 'Market Boom',
                description: 'Strong economic indicators boost startup valuations across all sectors.',
                impact: 0.15,
                sector: null
            },
            {
                type: 'market',
                title: 'Market Correction',
                description: 'Economic uncertainty leads to valuation adjustments.',
                impact: -0.1,
                sector: null
            },
            {
                type: 'sector',
                title: 'AI Investment Surge',
                description: 'Major tech companies increase AI investments, boosting AI startup valuations.',
                impact: 0.25,
                sector: 'AI/ML'
            },
            {
                type: 'sector',
                title: 'Green Energy Incentives',
                description: 'Government announces new clean energy subsidies.',
                impact: 0.2,
                sector: 'Green Energy'
            },
            {
                type: 'sector',
                title: 'Fintech Regulations',
                description: 'New financial regulations impact fintech startup operations.',
                impact: -0.15,
                sector: 'Fintech'
            }
        ];
        
        const event = events[Math.floor(Math.random() * events.length)];
        
        // Apply event impact
        this.gameState.portfolio.forEach(investment => {
            if (!event.sector || investment.industry === event.sector) {
                investment.currentValue *= (1 + event.impact);
                investment.currentValue = Math.max(0, investment.currentValue);
            }
        });
        
        this.addNewsItem(event.title, event.description, event.impact, 
                        `Portfolio ${event.impact > 0 ? 'gains' : 'losses'}: ${Math.abs(event.impact * 100).toFixed(1)}%`);
        
        this.showEventModal(event);
    }
    
    showEventModal(event) {
        const titleElement = document.getElementById('event-modal-title');
        const descriptionElement = document.getElementById('event-modal-description');
        const impactElement = document.getElementById('event-modal-impact');
        
        if (titleElement) titleElement.textContent = event.title;
        if (descriptionElement) descriptionElement.textContent = event.description;
        
        if (impactElement) {
            const impactClass = event.impact > 0 ? 'positive' : 'negative';
            const impactText = `Portfolio Impact: ${event.impact > 0 ? '+' : ''}${(event.impact * 100).toFixed(1)}%`;
            
            impactElement.className = `kc-game-event-impact ${impactClass}`;
            impactElement.textContent = impactText;
        }
        
        this.showModal('event-modal');
    }
    
    processStartupOutcomes() {
        if (Math.random() < 0.08) { // 8% chance per month for an outcome
            const activeInvestments = this.gameState.portfolio.filter(inv => inv.status === 'active');
            if (activeInvestments.length === 0) return;
            
            const investment = activeInvestments[Math.floor(Math.random() * activeInvestments.length)];
            const startup = this.startups.find(s => s.id === investment.startupId);
            
            if (!startup) return;
            
            if (Math.random() < startup.successProbability) {
                // Success outcome
                const multiplier = 2 + Math.random() * 18; // 2x to 20x return
                investment.currentValue = investment.amount * multiplier;
                investment.status = 'successful';
                
                // Reputation boost
                this.gameState.reputation += Math.min(10, Math.floor(multiplier / 2));
                
                this.addNewsItem(`${investment.startupName} Achieves Major Success!`,
                               `The ${startup.industry} startup has achieved a ${multiplier.toFixed(1)}x return for investors.`,
                               multiplier - 1, `Portfolio value increased by $${this.formatNumber(investment.currentValue - investment.amount)}`);
            } else if (Math.random() < 0.3) {
                // Failure outcome
                investment.currentValue = 0;
                investment.status = 'failed';
                
                // Reputation impact
                this.gameState.reputation = Math.max(0, this.gameState.reputation - 2);
                
                this.addNewsItem(`${investment.startupName} Faces Challenges`,
                               `The startup has encountered significant difficulties, impacting investor returns.`,
                               -1, `Investment loss: $${this.formatNumber(investment.amount)}`);
            }
        }
    }
    
    endCycle() {
        if (this.gameTimer) {
            clearInterval(this.gameTimer);
        }
        
        // Calculate performance
        const totalInvested = this.gameState.portfolio.reduce((sum, inv) => sum + inv.amount, 0);
        const currentValue = this.gameState.portfolio.reduce((sum, inv) => sum + inv.currentValue, 0);
        const totalReturn = ((currentValue + this.gameState.cashReserves - this.config.initialFundSize) / this.config.initialFundSize * 100);
        
        // Show performance modal
        const finalValueElement = document.getElementById('final-value');
        const totalReturnElement = document.getElementById('total-return');
        const finalReputationElement = document.getElementById('final-reputation');
        const benchmarkTextElement = document.getElementById('benchmark-text');
        
        if (finalValueElement) {
            finalValueElement.textContent = '$' + this.formatNumber(currentValue + this.gameState.cashReserves);
        }
        if (totalReturnElement) {
            totalReturnElement.textContent = totalReturn.toFixed(1) + '%';
        }
        if (finalReputationElement) {
            finalReputationElement.textContent = this.gameState.reputation.toString();
        }
        
        // Benchmark comparison
        const benchmarkReturn = 15; // 15% annual return benchmark
        const benchmarkText = totalReturn > benchmarkReturn ? 
            `🎉 Outstanding! You outperformed the benchmark by ${(totalReturn - benchmarkReturn).toFixed(1)}%` :
            `You underperformed the benchmark by ${(benchmarkReturn - totalReturn).toFixed(1)}%. Keep learning!`;
        
        if (benchmarkTextElement) {
            benchmarkTextElement.textContent = benchmarkText;
        }
        
        this.showModal('game-over-modal');
    }
    
    startNewCycle() {
        this.gameState.cycleNumber++;
        this.gameState.currentMonth = 1;
        this.gameState.gameStarted = false;
        this.gameState.fundSize = Math.round(this.gameState.fundSize * 1.2); // 20% increase
        this.gameState.cashReserves += this.gameState.portfolio.reduce((sum, inv) => sum + inv.currentValue, 0);
        
        // Move portfolio to completed investments
        this.gameState.completedInvestments.push(...this.gameState.portfolio);
        this.gameState.portfolio = [];
        
        // Reset startups availability (70% chance to be available again)
        this.startups.forEach(startup => {
            startup.available = Math.random() < 0.7;
        });
        
        this.closeModal();
        this.updateUI();
        this.renderStartups();
        this.saveGameState();
        
        this.showNotification(`Cycle ${this.gameState.cycleNumber} started! Fund size increased to $${this.formatNumber(this.gameState.fundSize)}`, 'success');
    }
    
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
            this.activeModal = modalId;
        }
    }
    
    closeModal() {
        if (this.activeModal) {
            const modal = document.getElementById(this.activeModal);
            if (modal) {
                modal.classList.add('hidden');
            }
            this.activeModal = null;
        }
    }
    
    updateUI() {
        // Update header stats
        const elements = {
            'fund-size': '$' + this.formatNumber(this.gameState.fundSize),
            'cash-reserves': '$' + this.formatNumber(this.gameState.cashReserves),
            'reputation-score': this.gameState.reputation.toString(),
            'current-month': `${this.gameState.currentMonth}/${this.config.cycleDurationMonths}`
        };
        
        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        });
        
        // Update game speed selector
        const gameSpeedSelect = document.getElementById('game-speed');
        if (gameSpeedSelect) {
            gameSpeedSelect.value = this.gameState.gameSpeed.toString();
        }
    }
    
    saveGameState() {
        try {
            localStorage.setItem('kc-investment-game', JSON.stringify({
                gameState: this.gameState,
                newsItems: this.newsItems,
                startups: this.startups.map(s => ({ id: s.id, available: s.available }))
            }));
        } catch (error) {
            console.error('Failed to save game state:', error);
        }
    }
    
    loadGameState() {
        try {
            const saved = localStorage.getItem('kc-investment-game');
            if (saved) {
                const data = JSON.parse(saved);
                this.gameState = { ...this.gameState, ...data.gameState };
                this.newsItems = data.newsItems || [];
                
                // Update startup availability
                if (data.startups) {
                    data.startups.forEach(savedStartup => {
                        const startup = this.startups.find(s => s.id === savedStartup.id);
                        if (startup) {
                            startup.available = savedStartup.available;
                        }
                    });
                }
                
                // Restart game loop if it was running
                if (this.gameState.gameStarted && this.gameState.currentMonth < this.config.cycleDurationMonths) {
                    this.startGameLoop();
                }
            }
        } catch (error) {
            console.error('Failed to load game state:', error);
        }
    }
    
    resetGame() {
        try {
            localStorage.removeItem('kc-investment-game');
        } catch (error) {
            console.error('Failed to clear localStorage:', error);
        }
        
        this.gameState = {
            fundSize: 10000000,
            cashReserves: 10000000,
            reputation: 50,
            currentMonth: 1,
            totalMonths: 12,
            portfolio: [],
            completedInvestments: [],
            gameSpeed: 1,
            cycleNumber: 1,
            gameStarted: false
        };
        
        this.newsItems = [];
        this.startups.forEach(startup => startup.available = true);
        
        if (this.gameTimer) {
            clearInterval(this.gameTimer);
        }
        
        this.updateUI();
        this.renderStartups();
        this.showNotification('Game reset successfully!', 'success');
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `kc-game-notification kc-game-notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 24px;
            border-radius: 6px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        // Set background color based on type
        const colors = {
            success: '#2ecc71',
            error: '#e74c3c',
            warning: '#f39c12',
            info: '#3498db'
        };
        notification.style.backgroundColor = colors[type] || colors.info;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    formatNumber(num) {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1) + 'B';
        } else if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        } else {
            return num.toLocaleString();
        }
    }
    
    showWelcomeMessage() {
        setTimeout(() => {
            this.showNotification('Welcome to Karanwal Capital! Start by exploring promising startups in the Startups tab.', 'info');
        }, 1000);
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing game...');
    window.game = new InvestmentGame();
    window.game.init();
});

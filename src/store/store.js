import axios from "axios";

const { makeAutoObservable } = require("mobx");

class Store {
  login = "";
  password = "";
  token = "";
  isAuthLoading = false;
  isAuthError = false;

  companiesInfo = { used: 0, limit: 0 };
  isCompanyInfoLoading = false;

  inn = null;
  tonality = "any";
  limit = 0;
  startDate = new Date();
  endDate = new Date();

  seachingFormChecks = {
    maxFullness: false,
    inBusinessNews: false,
    onlyMainRole: false,
    onlyWithRiskFactors: false,
    isTechNews: true,
    isAnnouncement: true,
    isDigest: true,
  };

  summaryDates = [];
  summaryAll = [];
  summaryRisks = [];
  summaryArticles = 0;
  summaryResults = {};
  isSummaryAllowed = false;
  isSummaryLoading = false;
  isSummaryError = false;

  publishIds = {};
  publishes = [];

  constructor() {
    makeAutoObservable(this);
  }

  setLogin = (login) => {
    this.login = login;
  };

  setPassword = (password) => {
    this.password = password;
  };

  setIsAuthLoading = (bool) => {
    this.isAuthLoading = bool;
  };

  setIsAuthError = (bool) => {
    this.isAuthError = bool;
  };

  setCompanyLimits = (used, limit) => {
    this.companiesInfo.used = used;
    this.companiesInfo.limit = limit;
  };

  setIsCompanyInfoLoading = (bool) => {
    this.isCompanyInfoLoading = bool;
  };

  setInn = (inn) => {
    this.inn = inn;
  };

  setTonality = (ton) => {
    this.tonality = ton;
  };

  setLimit = (number) => {
    this.limit = number;
  };

  setStartDate = (date) => {
    this.startDate = date;
  };

  setEndDate = (date) => {
    this.endDate = date;
  };

  setSeachingFormChecks = (param) => {
    switch (param) {
      case "maxFullness":
        this.seachingFormChecks.maxFullness === false
          ? (this.seachingFormChecks.maxFullness = true)
          : (this.seachingFormChecks.maxFullness = false);
        break;
      case "inBusinessNews":
        this.seachingFormChecks.inBusinessNews === false
          ? (this.seachingFormChecks.inBusinessNews = true)
          : (this.seachingFormChecks.inBusinessNews = false);
        break;
      case "onlyMainRole":
        this.seachingFormChecks.onlyMainRole === false
          ? (this.seachingFormChecks.onlyMainRole = true)
          : (this.seachingFormChecks.onlyMainRole = false);
        break;
      case "onlyWithRiskFactors":
        this.seachingFormChecks.onlyWithRiskFactors === false
          ? (this.seachingFormChecks.onlyWithRiskFactors = true)
          : (this.seachingFormChecks.onlyWithRiskFactors = false);
        break;
      case "isTechNews":
        this.seachingFormChecks.isTechNews === false
          ? (this.seachingFormChecks.isTechNews = true)
          : (this.seachingFormChecks.isTechNews = false);
        break;
      case "isAnnouncement":
        this.seachingFormChecks.isAnnouncement === false
          ? (this.seachingFormChecks.isAnnouncement = true)
          : (this.seachingFormChecks.isAnnouncement = false);
        break;
      case "isDigest":
        this.seachingFormChecks.isDigest === false
          ? (this.seachingFormChecks.isDigest = true)
          : (this.seachingFormChecks.isDigest = false);
        break;
      default:
        break;
    }
  };

  setSummaryResults = (results) => {
    this.summaryResults = results;
  };

  setSummaryDates = (dates) => {
    this.summaryDates = dates;
  };

  setSummaryAll = (all) => {
    this.summaryAll = all;
  };

  setSummaryRisks = (risks) => {
    this.summaryRisks = risks;
  };

  setSummaryArticles = (articles) => {
    this.summaryArticles = articles;
  };

  setIsSummaryAllowed = (bool) => {
    this.isSummaryAllowed = bool;
  };

  setIsSummaryLoading = (bool) => {
    this.isSummaryLoading = bool;
  };

  setIsSummaryError = (bool) => {
    this.isSummaryError = bool;
  };

  setPublishIds = (ids) => {
    this.publishIds = ids;
  };

  setPublish = (data) => {
    this.publishes = data;
  };

  getToken = () => {
    this.setIsAuthLoading(true);
    axios
      .post("https://gateway.scan-interfax.ru/api/v1/account/login", {
        login: `${this.login}`,
        password: `${this.password}`,
      })
      .then((response) => {
        if (response.status === 200) {
          this.setToken(response.data.accessToken);
          localStorage.setItem("token", response.data.accessToken);

          let currentDate = new Date();
          localStorage.setItem(
            "expire",
            currentDate.setDate(currentDate.getDate() + 1)
          );
          this.setIsAuthLoading(false);
        }
      })
      .catch((err) => {
        console.log(err.code);
        this.setIsAuthError(true);
        console.log(this.isAuthError);
        this.setLogin("");
        this.setPassword("");
      });
  };

  checkToken = () => {
    if (
      localStorage.getItem("token") !== "" &&
      localStorage.getItem("expire") > new Date()
    ) {
      this.setToken(localStorage.getItem("token"));
      return;
    }
    localStorage.clear();
  };

  getCompaniesInfo = () => {
    this.setIsCompanyInfoLoading(true);
    axios
      .get("https://gateway.scan-interfax.ru/api/v1/account/info", {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((response) => {
        this.setCompanyLimits(
          response.data.eventFiltersInfo.usedCompanyCount,
          response.data.eventFiltersInfo.companyLimit
        );
        this.setIsCompanyInfoLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getHistogram = () => {
    this.setIsSummaryLoading(true);
    axios
      .post("https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms", {
        issueDateInterval: {
          startDate: this.startDate,
          endDate: this.endDate,
        },
        searchContext: {
          targetSearchEntitiesContext: {
            targetSearchEntities: [
              {
                type: "company",
                sparkId: null,
                entityId: null,
                inn: this.inn,
                maxFullness: this.seachingFormChecks.maxFullness,
                inBusinessNews: this.seachingFormChecks.inBusinessNews,
              },
            ],
            onlyMainRole: this.seachingFormChecks.onlyMainRole,
            tonality: `${this.tonality}`,
            onlyWithRiskFactors: this.seachingFormChecks.onlyWithRiskFactors,
            riskFactors: {
              and: [],
              or: [],
              not: [],
            },
            themes: {
              and: [],
              or: [],
              not: [],
            },
          },
          themesFilter: {
            and: [],
            or: [],
            not: [],
          },
        },
        searchArea: {
          includedSources: [],
          excludedSources: [],
          includedSourceGroups: [],
          excludedSourceGroups: [],
        },
        attributeFilters: {
          excludeTechNews: this.seachingFormChecks.isTechNews,
          excludeAnnouncements: this.seachingFormChecks.isAnnouncement,
          excludeDigests: this.seachingFormChecks.isDigest,
        },
        similarMode: "duplicates",
        limit: this.limit,
        sortType: "sourceInfluence",
        sortDirectionType: "desc",
        intervalType: "month",
        histogramTypes: ["totalDocuments", "riskFactors"],
      })
      .then((response) => {
        this.setSummaryResults(response);
        if (
          this.summaryResults.status === 200 &&
          this.summaryResults.data !== [] &&
          this.summaryResults.data.data[0] !== undefined
        ) {
          this.setIsSummaryLoading(false);
        } else {
          this.setIsSummaryError(true);
          this.setIsSummaryLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getPublishIds = () => {
    axios
      .post("https://gateway.scan-interfax.ru/api/v1/objectsearch", {
        issueDateInterval: {
          startDate: this.startDate,
          endDate: this.endDate,
        },
        searchContext: {
          targetSearchEntitiesContext: {
            targetSearchEntities: [
              {
                type: "company",
                sparkId: null,
                entityId: null,
                inn: this.inn,
                maxFullness: this.seachingFormChecks.maxFullness,
                inBusinessNews: this.seachingFormChecks.inBusinessNews,
              },
            ],
            onlyMainRole: this.seachingFormChecks.onlyMainRole,
            tonality: `${this.tonality}`,
            onlyWithRiskFactors: this.seachingFormChecks.onlyWithRiskFactors,
            riskFactors: {
              and: [],
              or: [],
              not: [],
            },
            themes: {
              and: [],
              or: [],
              not: [],
            },
          },
          themesFilter: {
            and: [],
            or: [],
            not: [],
          },
        },
        searchArea: {
          includedSources: [],
          excludedSources: [],
          includedSourceGroups: [],
          excludedSourceGroups: [],
        },
        attributeFilters: {
          excludeTechNews: this.seachingFormChecks.isTechNews,
          excludeAnnouncements: this.seachingFormChecks.isAnnouncement,
          excludeDigests: this.seachingFormChecks.isDigest,
        },
        similarMode: "duplicates",
        limit: this.limit,
        sortType: "sourceInfluence",
        sortDirectionType: "desc",
        intervalType: "month",
        histogramTypes: ["totalDocuments", "riskFactors"],
      })
      .then((response) => {
        let result = [];
        response.data.items.map((el) => {
          return result.push(el.encodedId);
        });
        this.setPublishIds(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getLessTenPublishes = () => {
    axios
      .post("https://gateway.scan-interfax.ru/api/v1/documents", {
        ids: this.publishIds,
      })
      .then((response) => {
        this.setPublish(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getNextTenPublishes = (articles) => {
    axios
      .post("https://gateway.scan-interfax.ru/api/v1/documents", {
        ids: articles,
      })
      .then((response) => {
        this.setPublish([...this.publishes, ...response.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  setToken = (token) => {
    axios.interceptors.request.use(
      (config) => {
        config.headers["Authorization"] = `Bearer ${token}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    this.token = token;
  };
}

export default new Store();
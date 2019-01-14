import { parseXml } from '../../common/network'
import {
  convertAccount,
  convertApiTransaction,
  convertCards,
  convertDeposit,
  convertLoan,
  convertPayment,
  convertTarget,
  convertToZenMoneyTransaction,
  parseApiDescription
} from './converters'

describe('convertLoan', () => {
  it('returns valid loan', () => {
    const json = parseXml(`<loan> 
        <id>11721741</id> 
        <name>Потребительский кредит</name> 
        <smsName>4789</smsName> 
        <amount> 
            <amount>1500000,00</amount> 
            <currency> 
                <code>RUB</code>  
                <name>руб.</name> 
            </currency> 
        </amount> 
        <nextPayAmount> 
            <amount>50180,44</amount> 
            <currency> 
                <code>RUB</code>  
                <name>руб.</name> 
            </currency> 
        </nextPayAmount> 
        <nextPayDate>04.06.2018T00:00:00</nextPayDate> 
        <state>undefined</state> 
    </loan>`).loan
    const details = parseXml(`<?xml version="1.0" encoding="windows-1251" ?> 
<response> 
    <status> 
        <code>0</code> 
    </status> 
    <detail> 
        <description>Потребительский кредит</description> 
        <repaymentMethod>аннуитетный</repaymentMethod> 
        <termStart>02.12.2017T00:00:00</termStart> 
        <termDuration>3-0-0</termDuration> 
        <termEnd>02.12.2020T00:00:00</termEnd> 
        <borrowerFullName>Николай Николаевич Н.</borrowerFullName> 
        <agreementNumber>92890359</agreementNumber> 
        <accountNumber>45506810700020054789</accountNumber> 
        <personRole>заемщик/созаемщик</personRole> 
        <remainAmount> 
            <amount>1327156,27</amount> 
            <currency> 
                <code>RUB</code>  
                <name>руб.</name> 
            </currency> 
        </remainAmount> 
        <nextPayAmount> 
            <amount>50180,44</amount> 
            <currency> 
                <code>RUB</code>  
                <name>руб.</name> 
            </currency> 
        </nextPayAmount> 
        <nextPayDate>04.06.2018T00:00:00</nextPayDate> 
        <balanceAmount> 
            <amount>1327156,27</amount> 
            <currency> 
                <code>RUB</code>  
                <name>руб.</name> 
            </currency> 
        </balanceAmount> 
        <address>г.Москва, Ленинский проспект, 99</address> 
        <name>Потребительский кредит</name> 
    </detail> 
    <extDetail> 
        <kind> 
                                    АННУИТЕТНЫЙ 
        </kind> 
        <fullName>Потребительский кредит</fullName> 
        <rate>12.50</rate> 
        <type>Потребительский кредит</type> 
        <termEnd>02.12.2020T00:00:00</termEnd> 
        <origianlAmount> 
            <amount>1500000,00</amount> 
            <currency> 
                <code>RUB</code>  
                <name>руб.</name> 
            </currency> 
        </origianlAmount> 
        <remainAmount> 
            <amount>1327156,27</amount> 
            <currency> 
                <code>RUB</code>  
                <name>руб.</name> 
            </currency> 
        </remainAmount> 
        <nextPayment> 
            <nextPayDate>04.06.2018T00:00:00</nextPayDate> 
            <nextPaymentAmount> 
                <amount>50180,44</amount> 
                <currency> 
                    <code>RUB</code>  
                    <name>руб.</name> 
                </currency> 
            </nextPaymentAmount> 
            <infoText> 
                                        Ближайший платёж 04 июня, 50 180,44 руб.. Не хватает 49 492,41 руб. для оплаты. 
            </infoText> 
        </nextPayment> 
        <currentPayment> 
            <currentPayDate>04.06.2018T00:00:00</currentPayDate> 
            <nextPaymentAmount> 
                <amount>50180,44</amount> 
                <currency> 
                    <code>RUB</code>  
                    <name>руб.</name> 
                </currency> 
            </nextPaymentAmount> 
            <mainDeptAmount> 
                <amount>36134,06</amount> 
                <currency> 
                    <code>RUB</code>  
                    <name>руб.</name> 
                </currency> 
            </mainDeptAmount> 
            <interestsAmount> 
                <amount>14046,38</amount> 
                <currency> 
                    <code>RUB</code>  
                    <name>руб.</name> 
                </currency> 
            </interestsAmount> 
            <repaymentAmount> 
                <amount>688,03</amount> 
                <currency> 
                    <code>RUB</code>  
                    <name>руб.</name> 
                </currency> 
            </repaymentAmount> 
        </currentPayment> 
        <loanInfo> 
            <origianlAmount> 
                <amount>1500000,00</amount> 
                <currency> 
                    <code>RUB</code>  
                    <name>руб.</name> 
                </currency> 
            </origianlAmount> 
            <remainAmount> 
                <amount>1327156,27</amount> 
                <currency> 
                    <code>RUB</code>  
                    <name>руб.</name> 
                </currency> 
            </remainAmount> 
            <mainDeptAmount> 
                <amount>1323078,29</amount> 
                <currency> 
                    <code>RUB</code>  
                    <name>руб.</name> 
                </currency> 
            </mainDeptAmount> 
            <interestPaymentAmount> 
                <amount>4077,98</amount> 
                <currency> 
                    <code>RUB</code>  
                    <name>руб.</name> 
                </currency> 
            </interestPaymentAmount> 
            <creditingRate>12.50</creditingRate> 
            <termStart>02.12.2017T00:00:00</termStart> 
            <termEnd>02.12.2020T00:00:00</termEnd> 
            <agreementNumber>92890359</agreementNumber> 
            <accountNumber>45506810700020054789</accountNumber> 
            <repaymentMethod>аннуитетный</repaymentMethod> 
            <agencyAddress>г.Москва, Ленинский проспект, 99</agencyAddress> 
            <borrower>Николай Николаевич Н.</borrower> 
        </loanInfo> 
    </extDetail> 
</response>`).response
    expect(convertLoan(json, details)).toEqual({
      ids: ['11721741'],
      type: 'loan',
      zenAccount: {
        id: 'loan:11721741',
        type: 'loan',
        title: 'Потребительский кредит',
        instrument: 'RUB',
        syncID: [
          '45506810700020054789'
        ],
        balance: -1327156.27,
        startBalance: 1500000,
        capitalization: true,
        percent: 12.50,
        startDate: '2017-12-02',
        endDateOffsetInterval: 'year',
        endDateOffset: 3,
        payoffInterval: 'month',
        payoffStep: 1
      }
    })
  })

  it('returns valid loan if some fields are missing', () => {
    expect(convertLoan({
      id: '11934064',
      name: 'Потребительский кредит',
      smsName: '9184',
      state: null
    }, {
      status: {
        code: '0'
      },
      detail: {
        description: 'Потребительский кредит',
        repaymentMethod: 'аннуитетный',
        termStart: '04.01.2018T00:00:00',
        termDuration: '4-9-0',
        termEnd: '04.10.2022T00:00:00',
        agreementNumber: '235',
        accountNumber: '45507810013000079184',
        personRole: 'заемщик/созаемщик',
        name: 'Потребительский кредит'
      },
      extDetail: {
        kind: 'АННУИТЕТНЫЙ',
        fullName: 'Потребительский кредит',
        type: null,
        termEnd: '04.10.2022T00:00:00',
        origianlAmount: { amount: '700000,00', currency: { code: 'RUB', name: 'руб.' } },
        nextPayment: { infoText: 'Ближайший платёж ,' },
        currentPayment: null,
        loanInfo: {
          origianlAmount: { amount: '700000,00', currency: { code: 'RUB', name: 'руб.' } },
          termStart: '04.01.2018T00:00:00',
          termEnd: '04.10.2022T00:00:00',
          agreementNumber: '235',
          accountNumber: '45507810013000079184',
          repaymentMethod: 'аннуитетный'
        }
      }
    })).toEqual({
      ids: ['11934064'],
      type: 'loan',
      zenAccount: {
        id: 'loan:11934064',
        type: 'loan',
        title: 'Потребительский кредит',
        instrument: 'RUB',
        syncID: [
          '45507810013000079184'
        ],
        balance: -700000,
        startBalance: 700000,
        capitalization: true,
        percent: 1,
        startDate: '2018-01-04',
        endDateOffsetInterval: 'month',
        endDateOffset: 57,
        payoffInterval: 'month',
        payoffStep: 1
      }
    })
  })

  it('returns valid loan if termDuration is missing', () => {
    expect(convertLoan({
      id: '11934064',
      name: 'Потребительский кредит',
      smsName: '9184',
      state: null
    }, {
      status: {
        code: '0'
      },
      detail: {
        description: 'Потребительский кредит',
        repaymentMethod: 'аннуитетный',
        termStart: '04.01.2018T00:00:00',
        termEnd: '04.10.2022T00:00:00',
        agreementNumber: '235',
        accountNumber: '45507810013000079184',
        personRole: 'заемщик/созаемщик',
        name: 'Потребительский кредит'
      },
      extDetail: {
        kind: 'АННУИТЕТНЫЙ',
        fullName: 'Потребительский кредит',
        type: null,
        termEnd: '04.10.2022T00:00:00',
        origianlAmount: { amount: '700000,00', currency: { code: 'RUB', name: 'руб.' } },
        nextPayment: { infoText: 'Ближайший платёж ,' },
        currentPayment: null,
        loanInfo: {
          origianlAmount: { amount: '700000,00', currency: { code: 'RUB', name: 'руб.' } },
          termStart: '04.01.2018T00:00:00',
          termEnd: '04.10.2022T00:00:00',
          agreementNumber: '235',
          accountNumber: '45507810013000079184',
          repaymentMethod: 'аннуитетный'
        }
      }
    })).toEqual({
      ids: ['11934064'],
      type: 'loan',
      zenAccount: {
        id: 'loan:11934064',
        type: 'loan',
        title: 'Потребительский кредит',
        instrument: 'RUB',
        syncID: [
          '45507810013000079184'
        ],
        balance: -700000,
        startBalance: 700000,
        capitalization: true,
        percent: 1,
        startDate: '2018-01-04',
        endDateOffsetInterval: 'month',
        endDateOffset: 57,
        payoffInterval: 'month',
        payoffStep: 1
      }
    })
  })
})

describe('convertDeposit', () => {
  it('returns valid deposit', () => {
    const json = parseXml(`<account> 
                            <id>12632802</id> 
                            <name>Вклад Счёт (647)</name> 
                                <rate>0.01</rate> 
            <closeDate>15.01.2023</closeDate> 
                                    <smsName>3647</smsName> 
                                <number>42307810275022433647</number> 
    <balance> 
                        <amount>4845.23</amount> 
    <currency> 
        <code>RUB</code>  
        <name>руб.</name> 
    </currency> 
    </balance> 
    <availcash> 
                        <amount>4835.23</amount> 
    <currency> 
        <code>RUB</code>  
        <name>руб.</name> 
    </currency> 
    </availcash> 
                            <state>OPENED</state> 
                                <moneyBoxAvailable>true</moneyBoxAvailable> 
                            <arrested> 
                                    false 
                            </arrested> 
                            <showarrestdetail>false</showarrestdetail> 
                        </account> `).account
    const details = parseXml(`<?xml version="1.0" encoding="windows-1251" ?> 
<response> 
    <status> 
        <code>0</code> 
    </status> 
            <detail> 
                <description>Универсальный 5 лет</description> 
                    <period>0-0-1826</period> 
            <open>15.01.2013T00:00:00</open> 
            <close>15.01.2023T00:00:00</close> 
                    <interestRate>0.01</interestRate> 
    <maxSumWrite> 
                        <amount>4835.23</amount> 
    <currency> 
        <code>RUB</code>  
        <name>руб.</name> 
    </currency> 
    </maxSumWrite> 
                        <passbook>true</passbook> 
                    <crossAgency>true</crossAgency> 
                    <prolongation>true</prolongation> 
    <irreducibleAmt> 
                        <amount>10.00</amount> 
    <currency> 
        <code>RUB</code>  
        <name>руб.</name> 
    </currency> 
    </irreducibleAmt> 
                <name>Вклад Счёт (214)</name> 
                <canChangePercentDestination> 
                    true 
                </canChangePercentDestination> 
                    <moneyBoxAvailable> 
                        true 
                    </moneyBoxAvailable> 
            </detail> 
</response> `).response
    expect(convertDeposit(json, details)).toEqual({
      ids: ['12632802'],
      type: 'account',
      zenAccount: {
        id: 'account:12632802',
        type: 'deposit',
        title: 'Вклад Счёт (647)',
        instrument: 'RUB',
        syncID: [
          '42307810275022433647'
        ],
        balance: 4845.23,
        startBalance: 0,
        capitalization: true,
        percent: 0.01,
        startDate: '2013-01-15',
        endDateOffsetInterval: 'day',
        endDateOffset: 1826,
        payoffInterval: 'month',
        payoffStep: 1
      }
    })
  })
})

describe('convertCards', () => {
  const nowDate = new Date('2018-06-02T12:00:00Z')

  it('converts debit main and additional cards', () => {
    const jsonArray = parseXml(`<response> 
    <status> 
        <code>0</code> 
    </status> 
    <cards> 
        <status> 
            <code>0</code> 
        </status> 
        <card> 
            <id>105751883</id> 
            <name>Maestro</name> 
            <smsName>8802</smsName> 
            <description>Maestro</description> 
            <number>6390 02** **** **88 02</number> 
            <isMain>true</isMain> 
            <type>debit</type> 
            <availableLimit> 
                <amount>97,61</amount> 
                <currency> 
                    <code>RUB</code>  
                    <name>руб.</name> 
                </currency> 
            </availableLimit> 
            <state>active</state> 
            <cardAccount>40817810828150008490</cardAccount> 
            <showarrestdetail>false</showarrestdetail> 
            <expireDate>11/2018</expireDate> 
            <statusWay4>+-КАРТОЧКА ОТКРЫТА</statusWay4> 
        </card> 
        <card> 
            <id>105751885</id> 
            <name>Visa Classic</name> 
            <smsName>6939</smsName> 
            <description>Visa Classic</description> 
            <number>4276 28** **** 6939</number> 
            <isMain>true</isMain> 
            <type>debit</type> 
            <availableLimit> 
                <amount>2434,97</amount> 
                <currency> 
                    <code>RUB</code>  
                    <name>руб.</name> 
                </currency> 
            </availableLimit> 
            <state>active</state> 
            <cardAccount>40817810528150034829</cardAccount> 
            <showarrestdetail>false</showarrestdetail> 
            <expireDate>02/2020</expireDate> 
            <statusWay4>+-КАРТОЧКА ОТКРЫТА</statusWay4> 
        </card> 
        <card> 
            <id>105751881</id> 
            <name>Electron</name> 
            <smsName>7622</smsName> 
            <description>Electron</description> 
            <number>4276 82** **** 7622</number> 
            <isMain>true</isMain> 
            <type>debit</type> 
            <availableLimit> 
                <amount>150,00</amount> 
                <currency> 
                    <code>RUB</code>  
                    <name>руб.</name> 
                </currency> 
            </availableLimit> 
            <state>active</state> 
            <showarrestdetail>false</showarrestdetail> 
            <expireDate>08/2018</expireDate> 
            <statusWay4>K-ДЕЙСТ.ПРИОСТАНОВЛЕНО</statusWay4> 
        </card> 
        <card> 
            <id>105751882</id> 
            <name>Electron</name> 
            <smsName>2761</smsName> 
            <description>Electron</description> 
            <number>4276 82** **** 2761</number> 
            <isMain>false</isMain> 
            <type>debit</type> 
            <availableLimit> 
                <amount>150,00</amount> 
                <currency> 
                    <code>RUB</code>  
                    <name>руб.</name> 
                </currency> 
            </availableLimit> 
            <state>active</state> 
            <additionalCardType>Client2Other</additionalCardType> 
            <mainCardId>105751881</mainCardId> 
            <showarrestdetail>false</showarrestdetail> 
            <expireDate>08/2018</expireDate> 
            <statusWay4>K-ДЕЙСТ.ПРИОСТАНОВЛЕНО</statusWay4> 
        </card> 
    </cards> 
</response>`).response.cards.card.map(json => {
      return { account: json }
    })
    expect(convertCards(jsonArray, nowDate)).toEqual([
      {
        ids: ['105751881', '105751882'],
        type: 'card',
        zenAccount: {
          id: 'card:105751881',
          type: 'ccard',
          title: 'Electron',
          instrument: 'RUB',
          available: 150,
          syncID: [
            '427682******2761',
            '427682******7622'
          ]
        }
      },
      {
        ids: ['105751883'],
        type: 'card',
        zenAccount: {
          id: 'card:105751883',
          type: 'ccard',
          title: 'Maestro',
          instrument: 'RUB',
          available: 97.61,
          syncID: [
            '639002********8802',
            '40817810828150008490'
          ]
        }
      },
      {
        ids: ['105751885'],
        type: 'card',
        zenAccount: {
          id: 'card:105751885',
          type: 'ccard',
          title: 'Visa Classic',
          instrument: 'RUB',
          available: 2434.97,
          syncID: [
            '427628******6939',
            '40817810528150034829'
          ]
        }
      }
    ])
  })

  it('converts credit card', () => {
    const account = parseXml(`<card> 
                            <id>69474436</id> 
                            <name>Visa Gold</name> 
                                    <smsName>7314</smsName> 
                                <description>Visa Gold</description> 
                                <number>4279 01** **** 7314</number> 
                            <isMain>true</isMain> 
                            <type>credit</type> 
    <availableLimit> 
                        <amount>125000.00</amount> 
    <currency> 
        <code>RUB</code>  
        <name>руб.</name> 
    </currency> 
    </availableLimit> 
                            <state>active</state> 
                                <cardAccount>40817810855501402320</cardAccount> 
                            <showarrestdetail>false</showarrestdetail> 
                                <tokenExists> 
                                    false 
                                </tokenExists> 
                                    <expireDate>08/2018</expireDate> 
                                <statusWay4>+-КАРТОЧКА ОТКРЫТА</statusWay4> 
                        </card>`).card
    const details = parseXml(`<?xml version="1.0" encoding="windows-1251" ?> 
<response> 
    <status> 
        <code>0</code> 
    </status> 
            <detail> 
                    <creditType> 
    <limit> 
                        <amount>125000.00</amount> 
    <currency> 
        <code>RUB</code>  
        <name>руб.</name> 
    </currency> 
    </limit> 
    <ownSum> 
                        <amount>0.00</amount> 
    <currency> 
        <code>RUB</code>  
        <name>руб.</name> 
    </currency> 
    </ownSum> 
    <minPayment> 
                        <amount>0.00</amount> 
    <currency> 
        <code>RUB</code>  
        <name>руб.</name> 
    </currency> 
    </minPayment> 
                            <DebtInfoResult> 
                                <StatusCode> 
                                    0 
                                </StatusCode> 
                                    <DebtInfo> 
            <openDate>05.08.2015T00:00:00</openDate> 
    <ovdAmount> 
                        <amount>0.00</amount> 
                <currency> 
                    <code>RUR</code> 
                    <name>руб.</name> 
                </currency> 
    </ovdAmount> 
            <LastBillingDate>04.05.2018T00:00:00</LastBillingDate> 
    <MandPaymOnReport> 
                        <amount>1226.98</amount> 
                <currency> 
                    <code>RUR</code> 
                    <name>руб.</name> 
                </currency> 
    </MandPaymOnReport> 
    <MandatoryPaymentPAN> 
                        <amount>0.00</amount> 
    <currency> 
        <code>RUB</code>  
        <name>руб.</name> 
    </currency> 
    </MandatoryPaymentPAN> 
    <TotalOnReport> 
                        <amount>24539.58</amount> 
                <currency> 
                    <code>RUR</code> 
                    <name>руб.</name> 
                </currency> 
    </TotalOnReport> 
    <Debt> 
                        <amount>0.00</amount> 
                <currency> 
                    <code>RUR</code> 
                    <name>руб.</name> 
                </currency> 
    </Debt> 
    <Total_Tomorrow> 
                        <amount>0.00</amount> 
                <currency> 
                    <code>RUR</code> 
                    <name>руб.</name> 
                </currency> 
    </Total_Tomorrow> 
    <Total_DayAfterTomorrow> 
                        <amount>0.00</amount> 
                <currency> 
                    <code>RUR</code> 
                    <name>руб.</name> 
                </currency> 
    </Total_DayAfterTomorrow> 
    <Blocked_Cache> 
                        <amount>0.00</amount> 
                <currency> 
                    <code>RUR</code> 
                    <name>руб.</name> 
                </currency> 
    </Blocked_Cache> 
    <Total_ReportToday> 
                        <amount>0.00</amount> 
                <currency> 
                    <code>RUR</code> 
                    <name>руб.</name> 
                </currency> 
    </Total_ReportToday> 
                                    </DebtInfo> 
                            </DebtInfoResult> 
                    </creditType> 
                <holderName>НИКОЛАЙ НИКОЛАЕВИЧ Н.</holderName> 
    <availableCashLimit> 
                        <amount>125000.00</amount> 
    <currency> 
        <code>RUB</code>  
        <name>руб.</name> 
    </currency> 
    </availableCashLimit> 
    <purchaseLimit> 
                        <amount>125000.00</amount> 
    <currency> 
        <code>RUB</code>  
        <name>руб.</name> 
    </currency> 
    </purchaseLimit> 
                <officeName>Доп.офис №9055/0603</officeName> 
                    <accountNumber>40817810855501402320</accountNumber> 
                        <expireDate>08/2018</expireDate> 
                <name>Visa Gold</name> 
                    <cardAccount>40817810855501402320</cardAccount> 
                    <statusWay4>+-КАРТОЧКА ОТКРЫТА</statusWay4> 
            </detail> 
</response>`).response
    expect(convertCards([
      {
        account,
        details
      }
    ], nowDate)).toEqual([
      {
        ids: ['69474436'],
        type: 'card',
        zenAccount: {
          id: 'card:69474436',
          type: 'ccard',
          title: 'Visa Gold',
          instrument: 'RUB',
          creditLimit: 125000,
          balance: 0,
          syncID: [
            '427901******7314'
          ]
        }
      }
    ])
  })

  it('skips expired cards', () => {
    expect(convertCards([
      {
        account: {
          id: '593949641',
          name: 'Visa Classic',
          smsName: '3233',
          description: 'Visa Classic',
          number: '427655******3233',
          isMain: 'true',
          type: 'debit',
          availableLimit: { amount: '0.00', currency: { code: 'RUB', name: 'руб.' } },
          state: 'active',
          cardAccount: '40817810423044618561',
          showarrestdetail: 'false',
          tokenExists: 'false',
          expireDate: '10/2017',
          statusWay4: '+-КАРТОЧКА ОТКРЫТА'
        },
        details: {
          holderName: 'МИХАИЛ ИГОРЕВИЧ Л.',
          availableCashLimit: { amount: '0.00', currency: { code: 'RUB', name: 'руб.' } },
          purchaseLimit: { amount: '0.00', currency: { code: 'RUB', name: 'руб.' } },
          officeName: 'Доп.офис №9055/0774',
          accountNumber: '40817810423044618561',
          expireDate: '10/2017',
          name: 'Visa Classic',
          cardAccount: '40817810455033618561',
          statusWay4: '+-КАРТОЧКА ОТКРЫТА'
        }
      }
    ], nowDate)).toEqual([])
  })
})

describe('convertAccount', () => {
  it('returns valid account', () => {
    expect(convertAccount({
      id: '567930851',
      name: 'Управляй ОнЛ@йн 6м - 1г (руб.)',
      rate: '4.00',
      closeDate: '05.08.2018',
      smsName: '4892',
      number: '42305200715542994892',
      balance: { amount: '90467.72', currency: { code: 'RUB', name: 'руб.' } },
      availcash: { amount: '60467.72', currency: { code: 'RUB', name: 'руб.' } },
      state: 'OPENED',
      moneyBoxAvailable: 'true',
      arrested: 'false',
      showarrestdetail: 'false'
    }, {
      description: 'Управляй ОнЛ@йн 6м - 1г (руб.)',
      period: '0-0-181',
      open: '05.02.2018T00:00:00',
      close: '05.08.2018T00:00:00',
      interestRate: '4.00',
      maxSumWrite: { amount: '60467.72', currency: { code: 'RUB', name: 'руб.' } },
      passbook: 'false',
      crossAgency: 'true',
      prolongation: 'true',
      irreducibleAmt: { amount: '30000.00', currency: { code: 'RUB', name: 'руб.' } },
      name: 'Управляй ОнЛ@йн 6м - 1г (руб.)',
      canChangePercentDestination: 'true',
      moneyBoxAvailable: 'true',
      maxBalance: '1740000.00'
    })).toEqual({
      ids: ['567930851'],
      type: 'account',
      zenAccount: {
        id: 'account:567930851',
        type: 'checking',
        title: 'Управляй ОнЛ@йн 6м - 1г (руб.)',
        instrument: 'RUB',
        balance: 90467.72,
        savings: true,
        syncID: [
          '42305200715542994892'
        ]
      }
    })
  })
})

describe('convertTarget', () => {
  it('returns valid target accounts', () => {
    expect(convertTarget({
      type: 'RESERVE',
      id: '500603794',
      name: 'Финансовый резерв',
      comment: 'Подушка',
      date: '16.04.2018',
      amount: { amount: '500000.00', currency: { code: 'RUB', name: 'руб.' } },
      status: 'accountEnabled',
      account: {
        id: '560357253',
        rate: '1.00',
        value: { amount: '700.29', currency: { code: 'RUB', name: 'руб.' } },
        availcash: { amount: '700,29', currency: { code: 'RUB', name: 'руб.' } },
        arrested: 'false',
        showarrestdetail: 'false'
      },
      statusDescription: 'Информация о вкладе недоступна. Возможны две причины: задержка получения данных или вклад Вами был закрыт.'
    }, {
      description: 'Сберегательный счет',
      open: '16.04.2017T00:00:00',
      close: '01.01.2099T00:00:00',
      interestRate: '1.00',
      maxSumWrite: { amount: '700,29', currency: { code: 'RUB', name: 'руб.' } },
      passbook: 'false',
      crossAgency: 'true',
      prolongation: 'false',
      irreducibleAmt: { amount: '0,00', currency: { code: 'RUB', name: 'руб.' } },
      name: 'Сберегательный счет',
      target: {
        name: 'Финансовый резерв',
        comment: 'Подушка',
        date: '16.04.2018',
        amount: { amount: '500000.00', currency: { code: 'RUB', name: 'руб.' } }
      },
      canChangePercentDestination: 'false',
      moneyBoxAvailable: 'true',
      moneyBoxes: { box: { id: '27543068356', sumType: 'FIXED_SUMMA', amount: '700,00' } }
    })).toEqual({
      ids: ['560357253'],
      type: 'account',
      zenAccount: {
        id: 'account:560357253',
        type: 'checking',
        title: 'Подушка',
        instrument: 'RUB',
        balance: 700.29,
        savings: true,
        syncID: [
          '500603794'
        ]
      }
    })
  })
})

describe('parseApiDescription', () => {
  it('returns valid data', () => {
    expect(parseApiDescription('CH Payment RUS MOSCOW CH Payment RUS MOSCOW SBOL')).toEqual({
      payee: 'SBOL',
      description: 'CH Payment RUS MOSCOW'
    })
    expect(parseApiDescription('CH Payment RUS MOSCOW IDT:0614 2 RUS MOSCOW SBOL')).toEqual({
      payee: 'SBOL',
      description: 'CH Payment RUS MOSCOW'
    })
    expect(parseApiDescription('CH Debit RUS MOSCOW IDT:0513 1 RUS MOSCOW SBOL')).toEqual({
      payee: 'SBOL',
      description: 'CH Debit RUS MOSCOW'
    })
    expect(parseApiDescription('Retail LUX 4029357733 Retail LUX 4029357733 PAYPAL *YOURSERVERS')).toEqual({
      payee: 'PAYPAL *YOURSERVERS',
      description: 'Retail LUX 4029357733'
    })
    expect(parseApiDescription('BP Billing Transfer RUS  BP Billing Transfer RUS  SBERBANK ONL@IN PLATEZH')).toEqual({
      payee: 'SBERBANK ONL@IN PLATEZH',
      description: 'BP Billing Transfer RUS'
    })
    expect(parseApiDescription('Payment To 7000 Payment To')).toEqual({
      payee: null,
      description: 'Payment To 7000'
    })
    expect(parseApiDescription('Mobile Fee 3200 Mobile Fee')).toEqual({
      payee: null,
      description: 'Mobile Fee 3200'
    })
    expect(parseApiDescription('CH Payment RUS Visa Direct  IDT:0614 2 RUS Visa Direct TINKOFF BANK CARD2CARD')).toEqual({
      payee: 'TINKOFF BANK CARD2CARD',
      description: 'CH Payment RUS Visa Direct'
    })
    expect(parseApiDescription('unknown pattern')).toEqual({
      payee: null,
      description: 'unknown pattern'
    })
  })
})

describe('convertToZenMoneyTransaction', () => {
  it('converts income part of account -> card transfer', () => {
    const zenAccount = { id: 'account', instrument: 'RUB' }

    const transaction1 = convertApiTransaction({
      date: '24.06.2018T13:14:38',
      sum: {
        amount: '+3500.00',
        currency: { code: 'RUB', name: 'руб.' }
      },
      description: 'BP Acct - Card RUS  BP Acct - Card RUS  SBERBANK ONL@IN VKLAD-KARTA'
    }, zenAccount)
    expect(transaction1).toEqual({
      date: new Date('2018-06-24T13:14:38+03:00'),
      hold: null,
      description: 'BP Acct - Card RUS',
      payee: 'SBERBANK ONL@IN VKLAD-KARTA',
      posted: {
        amount: 3500,
        instrument: 'RUB'
      }
    })
    expect(convertToZenMoneyTransaction(zenAccount, transaction1)).toEqual({
      date: new Date('2018-06-24T13:14:38+03:00'),
      hold: null,
      income: 3500,
      incomeAccount: 'account',
      outcome: 0,
      outcomeAccount: 'account',
      comment: 'SBERBANK ONL@IN VKLAD-KARTA',
      _transferType: 'outcome',
      _transferId: '2018-06-24_1_RUB_3500'
    })
  })

  it('converts outcome part of account -> card transfer', () => {
    const zenAccount = { id: 'account', instrument: 'RUB' }

    const transaction = convertApiTransaction({
      date: '24.06.2018T00:00:00',
      sum: {
        amount: '-3500.00',
        currency: { code: 'RUB', name: 'руб.' }
      },
      description: 'Частичная выдача',
      'transaction.operationCode': '3'
    }, zenAccount)
    expect(transaction).toEqual({
      date: new Date('2018-06-24T00:00:00+03:00'),
      hold: null,
      description: 'Частичная выдача',
      payee: null,
      posted: {
        amount: -3500,
        instrument: 'RUB'
      }
    })
    expect(convertToZenMoneyTransaction(zenAccount, transaction)).toEqual({
      date: new Date('2018-06-24T00:00:00+03:00'),
      hold: null,
      income: 0,
      incomeAccount: 'account',
      outcome: 3500,
      outcomeAccount: 'account',
      _transferType: 'income',
      _transferId: '2018-06-24_1_RUB_3500'
    })
  })

  it('converts outсome part of card -> account transfer', () => {
    const zenAccount = { id: 'account', instrument: 'RUB' }

    const transaction = convertApiTransaction({
      date: '20.06.2018T12:43:32',
      sum: {
        amount: '-4700,00',
        currency: { code: 'RUB', name: 'руб.' }
      },
      description: 'BP Card - Acct RUS  BP Card - Acct RUS  SBERBANK ONL@IN KARTA-VKLAD'
    }, zenAccount)
    expect(transaction).toEqual({
      date: new Date('2018-06-20T12:43:32+03:00'),
      hold: null,
      description: 'BP Card - Acct RUS',
      payee: 'SBERBANK ONL@IN KARTA-VKLAD',
      posted: {
        amount: -4700,
        instrument: 'RUB'
      }
    })
    expect(convertToZenMoneyTransaction(zenAccount, transaction)).toEqual({
      date: new Date('2018-06-20T12:43:32+03:00'),
      hold: null,
      income: 0,
      incomeAccount: 'account',
      outcome: 4700,
      outcomeAccount: 'account',
      comment: 'SBERBANK ONL@IN KARTA-VKLAD',
      _transferType: 'income',
      _transferId: '2018-06-20_2_RUB_4700'
    })
  })

  it('converts inсome part of card -> account transfer', () => {
    const zenAccount = { id: 'account', instrument: 'RUB' }

    const transaction = convertApiTransaction({
      date: '20.06.2018T00:00:00',
      sum: {
        amount: '+4700,00',
        currency: { code: 'RUB', name: 'руб.' }
      },
      description: 'Дополнительный взнос',
      'transaction.operationCode': '2'
    }, zenAccount)
    expect(transaction).toEqual({
      date: new Date('2018-06-20T00:00:00+03:00'),
      hold: null,
      description: 'Дополнительный взнос',
      payee: null,
      posted: {
        amount: 4700,
        instrument: 'RUB'
      }
    })
    expect(convertToZenMoneyTransaction(zenAccount, transaction)).toEqual({
      date: new Date('2018-06-20T00:00:00+03:00'),
      hold: null,
      income: 4700,
      incomeAccount: 'account',
      outcome: 0,
      outcomeAccount: 'account',
      _transferType: 'outcome',
      _transferId: '2018-06-20_2_RUB_4700'
    })
  })

  it('converts income part of card -> card transfer', () => {
    const zenAccount = { id: 'account', instrument: 'RUB' }

    const transaction1 = convertApiTransaction({
      date: '20.06.2018T13:03:59',
      sum: {
        amount: '+100,00',
        currency: { code: 'RUB', name: 'руб.' }
      },
      description: 'CH Payment RUS MOSCOW CH Payment RUS MOSCOW SBOL'
    }, zenAccount)
    expect(transaction1).toEqual({
      date: new Date('2018-06-20T13:03:59+03:00'),
      hold: null,
      description: 'CH Payment RUS MOSCOW',
      payee: 'SBOL',
      posted: {
        amount: 100,
        instrument: 'RUB'
      }
    })
    expect(convertToZenMoneyTransaction(zenAccount, transaction1)).toEqual({
      date: new Date('2018-06-20T13:03:59+03:00'),
      hold: null,
      income: 100,
      incomeAccount: 'account',
      outcome: 0,
      outcomeAccount: 'account',
      comment: 'SBOL',
      _transferType: 'outcome',
      _transferId: '1529489039000_RUB_100'
    })
  })

  it('converts outcome part of card -> card transfer', () => {
    const zenAccount = { id: 'account', instrument: 'RUB' }

    const transaction1 = convertApiTransaction({
      date: '20.06.2018T13:03:59',
      sum: {
        amount: '-100,00',
        currency: { code: 'RUB', name: 'руб.' }
      },
      description: 'CH Debit RUS MOSCOW CH Debit RUS MOSCOW SBOL'
    }, zenAccount)
    expect(transaction1).toEqual({
      date: new Date('2018-06-20T13:03:59+03:00'),
      hold: null,
      description: 'CH Debit RUS MOSCOW',
      payee: 'SBOL',
      posted: {
        amount: -100,
        instrument: 'RUB'
      }
    })
    expect(convertToZenMoneyTransaction(zenAccount, transaction1)).toEqual({
      date: new Date('2018-06-20T13:03:59+03:00'),
      hold: null,
      income: 0,
      incomeAccount: 'account',
      outcome: 100,
      outcomeAccount: 'account',
      comment: 'SBOL',
      _transferType: 'income',
      _transferId: '1529489039000_RUB_100'
    })
  })

  it('converts outer transfer', () => {
    const zenAccount = { id: 'account', instrument: 'RUB' }

    const transaction1 = convertApiTransaction({
      date: '20.06.2018T15:32:50',
      sum: {
        amount: '-10000,00',
        currency: { code: 'RUB', name: 'руб.' }
      },
      description: 'Retail RUS MOSCOW Retail RUS MOSCOW Tinkoff Bank Card2Card'
    }, zenAccount)
    expect(transaction1).toEqual({
      date: new Date('2018-06-20T15:32:50+03:00'),
      hold: null,
      description: 'Retail RUS MOSCOW',
      payee: 'Tinkoff Bank Card2Card',
      posted: {
        amount: -10000,
        instrument: 'RUB'
      }
    })
    expect(convertToZenMoneyTransaction(zenAccount, transaction1)).toEqual({
      date: new Date('2018-06-20T15:32:50+03:00'),
      hold: false,
      income: 0,
      incomeAccount: 'account',
      outcome: 10000,
      outcomeAccount: 'account',
      comment: 'Перевод с карты'
    })
  })
})

describe('convertPayment', () => {
  it('converts currency transaction', () => {
    expect(convertPayment({
      autopayable: 'false',
      copyable: 'false',
      date: '28.12.2018T14:01:43',
      description: 'Прочие списания',
      form: 'ExtCardOtherOut',
      from: 'MasterCard Mass 5298 26** **** 3389',
      id: '11091826112',
      imageId: { staticImage: { url: null } },
      invoiceReminderSupported: 'false',
      invoiceSubscriptionSupported: 'false',
      isMobilePayment: 'false',
      operationAmount: { amount: '-5.00', currency: { code: 'EUR', name: '€' } },
      state: 'AUTHORIZATION',
      templatable: 'false',
      to: 'GO.SKYPE.COM/BILL',
      type: 'payment',
      ufsId: null,
      details: {
        amount: {
          changed: 'false',
          editable: 'false',
          isSum: 'false',
          moneyType: { value: '414.05' },
          name: 'amount',
          required: 'false',
          title: 'Сумма в валюте счета',
          type: 'money',
          visible: 'true'
        },
        commission: {
          changed: 'false',
          editable: 'false',
          isSum: 'false',
          moneyType: null,
          name: 'commission',
          required: 'false',
          title: 'Комиссия',
          type: 'money',
          visible: 'false'
        },
        description: {
          changed: 'false',
          editable: 'false',
          isSum: 'false',
          name: 'description',
          required: 'false',
          stringType: { value: 'GO.SKYPE.COM/BILL        LUXEMBOURG   LUX' },
          title: 'Описание',
          type: 'string',
          visible: 'true'
        },
        fromResource: {
          changed: 'false',
          editable: 'false',
          isSum: 'false',
          name: 'fromResource',
          required: 'true',
          resourceType: {
            availableValues: {
              valueItem: {
                currency: 'RUB',
                displayedValue: '5298 26** **** 3389 [MasterCard Mass]',
                selected: 'true',
                value: 'card:51833625'
              }
            }
          },
          title: 'Счет списания',
          type: 'resource',
          visible: 'true'
        },
        nfc: {
          changed: 'false',
          editable: 'false',
          isSum: 'false',
          name: 'nfc',
          required: 'false',
          stringType: null,
          title: 'Бесконтактная операция NFC',
          type: 'string',
          visible: 'false'
        },
        operationDate: {
          changed: 'false',
          editable: 'false',
          isSum: 'false',
          name: 'operationDate',
          required: 'false',
          stringType: { value: '28.12.2018 14:01:43' },
          title: 'Дата и время совершения операции',
          type: 'string',
          visible: 'true'
        },
        paymentDetails: {
          changed: 'false',
          editable: 'false',
          isSum: 'false',
          name: 'paymentDetails',
          required: 'false',
          stringType: null,
          title: 'Информация о платеже',
          type: 'string',
          visible: 'false'
        },
        sellAmount: {
          changed: 'false',
          editable: 'false',
          isSum: 'false',
          moneyType: { value: '5' },
          name: 'sellAmount',
          required: 'false',
          title: 'Сумма списания',
          type: 'money',
          visible: 'true'
        }
      }
    }, { id: 'account', instrument: 'RUB' })).toEqual({
      hold: true,
      date: new Date('2018-12-28T14:01:43+03:00'),
      movements: [
        {
          id: '11091826112',
          account: { id: 'account' },
          invoice: {
            sum: -5,
            instrument: 'EUR'
          },
          sum: -414.05,
          fee: null
        }
      ],
      merchant: {
        title: 'GO.SKYPE.COM/BILL',
        city: 'LUXEMBOURG',
        country: 'LUX',
        mcc: null,
        location: null
      },
      comment: null
    })
  })

  it('converts cash replenishment', () => {
    expect(convertPayment({
      autopayable: 'false',
      copyable: 'false',
      date: '19.12.2018T10:49:12',
      description: 'Внесение наличных',
      form: 'ExtCardCashIn',
      id: '10774664622',
      imageId: {
        staticImage: { url: 'https://pfm-stat.online.sberbank.ru/PFM/logos/33355.jpg' }
      },
      invoiceReminderSupported: 'false',
      invoiceSubscriptionSupported: 'false',
      isMobilePayment: 'false',
      operationAmount: {
        amount: '41000.00',
        currency: { code: 'RUB', name: 'руб.' }
      },
      state: 'FINANCIAL',
      templatable: 'false',
      to: 'Банкомат Сбербанка',
      type: 'payment',
      ufsId: null
    }, { id: 'account', instrument: 'RUB' })).toEqual({
      hold: false,
      date: new Date('2018-12-19T10:49:12+03:00'),
      movements: [
        {
          id: '10774664622',
          account: { id: 'account' },
          invoice: null,
          sum: 41000,
          fee: null
        },
        {
          id: null,
          account: {
            type: 'cash',
            instrument: 'RUB',
            company: null,
            syncIds: null
          },
          invoice: null,
          sum: -41000,
          fee: null
        }
      ],
      merchant: null,
      comment: null
    })
  })

  it('converts outer income transfer', () => {
    expect(convertPayment({
      autopayable: 'false',
      copyable: 'false',
      date: '28.12.2018T17:01:17',
      description: 'Входящий перевод',
      form: 'ExtCardTransferIn',
      from: '5291 67** **** 2272',
      id: '11091826845',
      imageId: { staticImage: { url: 'https://pfm-stat.online.sberbank.ru/PFM/logos/11ffac45-05f8-4dbd-b7e0-983ffda0bb72.png' } },
      invoiceReminderSupported: 'false',
      invoiceSubscriptionSupported: 'false',
      isMobilePayment: 'false',
      operationAmount: {
        amount: '700.00',
        currency: { code: 'RUB', name: 'руб.' }
      },
      state: 'FINANCIAL',
      templatable: 'false',
      to: 'Тинькофф Банк',
      type: 'payment',
      ufsId: null,
      details: {
        amount: {
          changed: 'false',
          editable: 'false',
          moneyType: {
            currency: { code: 'RUB' },
            value: '700'
          },
          name: 'amount',
          required: 'false',
          title: 'Сумма в валюте счета',
          type: 'money',
          visible: 'false'
        },
        buyAmount: {
          changed: 'false',
          editable: 'false',
          moneyType: {
            currency: { code: 'RUB' },
            value: '700'
          },
          name: 'buyAmount',
          required: 'false',
          title: 'Сумма зачисления',
          type: 'money',
          visible: 'true'
        },
        description: {
          changed: 'false',
          editable: 'false',
          name: 'description',
          required: 'false',
          stringType: { value: 'Тинькофф Банк' },
          title: 'Описание',
          type: 'string',
          visible: 'true'
        },
        fromResource: {
          changed: 'false',
          editable: 'false',
          name: 'fromResource',
          required: 'true',
          stringType: { value: '**** 2272' },
          title: 'Счет списания',
          type: 'string',
          visible: 'true'
        },
        operationDate: {
          changed: 'false',
          editable: 'false',
          name: 'operationDate',
          required: 'false',
          stringType: { value: '28.12.2018 17:01:17' },
          title: 'Дата и время совершения операции',
          type: 'string',
          visible: 'true'
        },
        toResource: {
          changed: 'false',
          editable: 'false',
          name: 'toResource',
          required: 'true',
          resourceType: {
            availableValues: {
              valueItem: {
                currency: 'RUB',
                displayedValue: '5298 26** **** 3389 [MasterCard Mass]',
                selected: 'true',
                value: 'card:51833625'
              }
            }
          },
          title: 'Счет зачисления',
          type: 'resource',
          visible: 'true'
        }
      }
    }, { id: 'account', instrument: 'RUB' })).toEqual({
      hold: false,
      date: new Date('2018-12-28T17:01:17+03:00'),
      movements: [
        {
          id: '11091826845',
          account: { id: 'account' },
          invoice: null,
          sum: 700,
          fee: null
        },
        {
          id: null,
          account: {
            type: null,
            instrument: 'RUB',
            company: {
              title: 'Тинькофф Банк'
            },
            syncIds: ['2272']
          },
          invoice: null,
          sum: -700,
          fee: null
        }
      ],
      merchant: null,
      comment: null
    })
  })

  it('converts outer outcome transfer with commission', () => {
    expect(convertPayment({
      autopayable: 'false',
      copyable: 'true',
      date: '09.01.2019T15:23:10',
      description: 'Перевод на карту в другом банке',
      form: 'RurPayment',
      from: 'MasterCard Mass 5298 26** **** 3389',
      id: '11363529083',
      imageId: { staticImage: { url: null } },
      invoiceReminderSupported: 'false',
      invoiceSubscriptionSupported: 'false',
      isMobilePayment: 'false',
      operationAmount: {
        amount: '-100.00',
        currency: { code: 'RUB', name: 'руб.' }
      },
      state: 'EXECUTED',
      templatable: 'true',
      to: '**** 2272',
      type: 'payment',
      ufsId: null,
      details: {
        admissionDate: {
          changed: 'false',
          dateType: { value: '09.01.2019' },
          editable: 'false',
          name: 'admissionDate',
          required: 'true',
          title: 'Плановая дата исполнения',
          type: 'date',
          visible: 'true'
        },
        buyAmount: {
          changed: 'false',
          editable: 'false',
          moneyType: {
            value: '100'
          },
          name: 'buyAmount',
          required: 'true',
          title: 'Сумма зачисления',
          type: 'money',
          visible: 'true'
        },
        commission: {
          amount: '30.00',
          currency: { code: 'RUB', name: 'руб.' }
        },
        documentDate: {
          changed: 'false',
          dateType: { value: '09.01.2019' },
          editable: 'false',
          name: 'documentDate',
          required: 'true',
          title: 'Дата документа',
          type: 'date',
          visible: 'true'
        },
        documentNumber: {
          changed: 'false',
          editable: 'false',
          integerType: { value: '898796' },
          name: 'documentNumber',
          required: 'true',
          title: 'Номер документа',
          type: 'integer',
          visible: 'true'
        },
        fromResource: {
          changed: 'false',
          editable: 'false',
          name: 'fromResource',
          required: 'true',
          resourceType: {
            availableValues: {
              valueItem: {
                currency: 'RUB',
                displayedValue: '5298 26** **** 3389 [MasterCard Mass]',
                selected: 'true',
                value: 'card:51833625'
              }
            }
          },
          title: 'Счет списания',
          type: 'resource',
          visible: 'true'
        },
        isFundPayment: {
          booleanType: { value: 'false' },
          changed: 'false',
          editable: 'false',
          name: 'isFundPayment',
          required: 'false',
          title: 'Является ли перевод оплатой сбора средств',
          type: 'boolean',
          visible: 'false'
        },
        receiverAccount: {
          changed: 'false',
          editable: 'false',
          name: 'receiverAccount',
          required: 'true',
          stringType: { value: '**** 2272' },
          title: 'Номер счета/карты получателя',
          type: 'string',
          visible: 'true'
        }
      }
    }, { id: 'account', instrument: 'RUB' })).toEqual({
      hold: false,
      date: new Date('2019-01-09T15:23:10+03:00'),
      movements: [
        {
          id: '11363529083',
          account: { id: 'account' },
          invoice: null,
          sum: -100,
          fee: -30
        },
        {
          id: null,
          account: {
            type: null,
            instrument: 'RUB',
            company: null,
            syncIds: ['2272']
          },
          invoice: null,
          sum: 100,
          fee: null
        }
      ],
      merchant: null,
      comment: null
    })
  })

  it('converts outcome outer transfer to Sberbank client', () => {
    expect(convertPayment({
      autopayable: 'true',
      copyable: 'true',
      date: '19.12.2018T17:27:04',
      description: 'Перевод клиенту Сбербанка',
      form: 'RurPayment',
      from: 'MasterCard Mass 5298 26** **** 3389',
      id: '10778953787',
      imageId: { staticImage: {} },
      invoiceReminderSupported: 'false',
      invoiceSubscriptionSupported: 'false',
      isMobilePayment: 'false',
      operationAmount: { amount: '-40000.00', currency: { code: 'RUB', name: 'руб.' } },
      state: 'EXECUTED',
      templatable: 'true',
      to: 'НИКОЛАЙ НИКОЛАЕВИЧ Н.                                                        5184 27** **** 1478',
      type: 'payment',
      ufsId: null,
      details: {
        admissionDate: {
          changed: 'false',
          dateType: { value: '19.12.2018' },
          editable: 'false',
          name: 'admissionDate',
          required: 'true',
          title: 'Плановая дата исполнения',
          type: 'date',
          visible: 'true'
        },
        buyAmount: {
          changed: 'false',
          editable: 'false',
          moneyType: null,
          name: 'buyAmount',
          required: 'true',
          title: 'Сумма зачисления',
          type: 'money',
          visible: 'false'
        },
        commission: { amount: '0.00', currency: { code: 'RUB', name: 'руб.' } },
        documentDate: {
          changed: 'false',
          dateType: { value: '19.12.2018' },
          editable: 'false',
          name: 'documentDate',
          required: 'true',
          title: 'Дата документа',
          type: 'date',
          visible: 'true'
        },
        documentNumber: {
          changed: 'false',
          editable: 'false',
          integerType: { value: '90672' },
          name: 'documentNumber',
          required: 'true',
          title: 'Номер документа',
          type: 'integer',
          visible: 'true'
        },
        fromResource: {
          changed: 'false',
          editable: 'false',
          name: 'fromResource',
          required: 'false',
          resourceType: {
            availableValues: {
              valueItem: {
                value: 'card:51833625',
                selected: 'true',
                displayedValue: '5298 26** **** 3389 [MasterCard Mass]',
                currency: 'RUB'
              }
            }
          },
          title: 'Счет списания',
          type: 'resource',
          visible: 'true'
        },
        isFundPayment: {
          booleanType: { value: 'false' },
          changed: 'false',
          editable: 'false',
          name: 'isFundPayment',
          required: 'false',
          title: 'Является ли перевод оплатой сбора средств',
          type: 'boolean',
          visible: 'false'
        },
        messageToReceiverStatus: {
          changed: 'false',
          editable: 'false',
          name: 'messageToReceiverStatus',
          required: 'false',
          stringType: { value: 'сообщение отправлено' },
          title: 'Статус SMS-сообщения',
          type: 'string',
          visible: 'true'
        },
        receiverAccount: {
          changed: 'false',
          editable: 'false',
          name: 'receiverAccount',
          required: 'true',
          stringType: { value: '5184 27** **** 1478' },
          title: 'Номер счета/карты получателя',
          type: 'string',
          visible: 'true'
        },
        receiverName: {
          changed: 'false',
          editable: 'false',
          name: 'receiverName',
          required: 'true',
          stringType: { value: 'НИКОЛАЙ НИКОЛАЕВИЧ Н.' },
          title: 'ФИО получателя',
          type: 'string',
          visible: 'true'
        },
        sellAmount: {
          changed: 'false',
          editable: 'false',
          moneyType: { value: '40000.00' },
          name: 'sellAmount',
          required: 'true',
          title: 'Сумма в валюте списания',
          type: 'money',
          visible: 'true'
        },
        sellCurrency: {
          changed: 'false',
          editable: 'false',
          name: 'sellAmountCurrency',
          required: 'true',
          stringType: { value: 'RUB' },
          title: 'Валюта списания',
          type: 'string',
          visible: 'true'
        }
      }
    }, { id: 'account', instrument: 'RUB' })).toEqual({
      hold: false,
      date: new Date('2018-12-19T17:27:04+03:00'),
      movements: [
        {
          id: '10778953787',
          account: { id: 'account' },
          invoice: null,
          sum: -40000,
          fee: null
        },
        {
          id: null,
          account: {
            type: null,
            instrument: 'RUB',
            company: {
              id: '4624'
            },
            syncIds: ['1478']
          },
          invoice: null,
          sum: 40000,
          fee: null
        }
      ],
      merchant: {
        title: 'НИКОЛАЙ НИКОЛАЕВИЧ Н.',
        city: null,
        country: null,
        mcc: null,
        location: null
      },
      comment: null
    })
  })

  it('converts inner transfer', () => {
    expect(convertPayment({
      autopayable: 'true',
      copyable: 'true',
      date: '19.12.2018T17:26:24',
      description: 'Перевод между своими счетами',
      form: 'InternalPayment',
      from: 'MasterCard Mass 5298 26** **** 3389',
      id: '10778929144',
      imageId: { staticImage: { url: null } },
      invoiceReminderSupported: 'false',
      invoiceSubscriptionSupported: 'false',
      isMobilePayment: 'false',
      operationAmount: { amount: '-3710.81', currency: { code: 'RUB', name: 'руб.' } },
      state: 'EXECUTED',
      templatable: 'true',
      to: 'Visa Gold 4281 01** **** 5370',
      type: 'payment',
      ufsId: null,
      details: {
        fromResource: {
          changed: 'false',
          editable: 'false',
          name: 'fromResource',
          required: 'false',
          resourceType: {
            availableValues: {
              valueItem: { value: 'card:51833625', selected: 'true', displayedValue: '5298 26** **** 3389 [MasterCard Mass]', currency: 'RUB' }
            }
          },
          title: 'Счет списания',
          type: 'resource',
          visible: 'true'
        },
        sellAmount: {
          changed: 'false',
          editable: 'false',
          moneyType: { value: '3710.81' },
          name: 'sellAmount',
          required: 'false',
          title: 'Сумма списания',
          type: 'money',
          visible: 'true'
        },
        toResource: {
          changed: 'false',
          editable: 'false',
          name: 'toResource',
          required: 'false',
          resourceType: {
            availableValues: {
              valueItem: { value: 'card:69474436', selected: 'true', displayedValue: '4281 01** **** 5370 [Visa Gold]', currency: 'RUB' }
            }
          },
          title: 'Ресурс зачисления',
          type: 'resource',
          visible: 'true'
        }
      }
    }, { id: 'account', instrument: 'RUB' })).toEqual({
      hold: false,
      date: new Date('2018-12-19T17:26:24+03:00'),
      movements: [
        {
          id: '10778929144',
          account: { id: 'card:51833625' },
          invoice: null,
          sum: -3710.81,
          fee: null
        },
        {
          id: '10778929144',
          account: { id: 'card:69474436' },
          invoice: null,
          sum: 3710.81,
          fee: null
        }
      ],
      merchant: null,
      comment: null
    })
  })

  it('converts commission', () => {
    expect(convertPayment({
      autopayable: 'false',
      copyable: 'false',
      date: '19.12.2018T00:00:00',
      description: 'Комиссии',
      form: 'TakingMeans',
      from: 'MasterCard Mass 5298 26** **** 3389',
      id: '10790859369',
      imageId: { staticImage: { url: null } },
      invoiceReminderSupported: 'false',
      invoiceSubscriptionSupported: 'false',
      isMobilePayment: 'false',
      operationAmount: { amount: '-60.00', currency: { code: 'RUB', name: 'руб.' } },
      state: 'FINANCIAL',
      templatable: 'false',
      type: 'payment',
      ufsId: null
    }, { id: 'account', instrument: 'RUB' })).toEqual({
      hold: false,
      date: new Date('2018-12-19T00:00:00+03:00'),
      movements: [
        {
          id: '10790859369',
          account: { id: 'account' },
          invoice: null,
          sum: -60,
          fee: null
        }
      ],
      merchant: null,
      comment: 'Комиссии'
    })
  })

  it('converts online payment', () => {
    expect(convertPayment({
      autopayable: 'true',
      copyable: 'true',
      date: '24.12.2018T16:10:18',
      description: 'Оплата услуг',
      form: 'RurPayJurSB',
      from: 'Visa Gold 4281 01** **** 5370',
      id: '10936646113',
      imageId: { staticImage: { url: null } },
      invoiceReminderSupported: 'false',
      invoiceSubscriptionSupported: 'true',
      isMobilePayment: 'false',
      operationAmount: { amount: '-192.67', currency: { code: 'RUB', name: 'руб.' } },
      state: 'EXECUTED',
      templatable: 'true',
      to: 'Газпром межрегионгаз Санкт-Петербург                                                                        40702810055230176256',
      type: 'servicePayment',
      ufsId: null
    }, { id: 'account', instrument: 'RUB' })).toEqual({
      hold: false,
      date: new Date('2018-12-24T16:10:18+03:00'),
      movements: [
        {
          id: '10936646113',
          account: { id: 'account' },
          invoice: null,
          sum: -192.67,
          fee: null
        }
      ],
      merchant: {
        title: 'Газпром межрегионгаз Санкт-Петербург',
        city: null,
        country: null,
        mcc: null,
        location: null
      },
      comment: null
    })
  })

  it('converts transfer without sell amount', () => {
    expect(convertPayment({
      id: '10950380712',
      ufsId: null,
      state: 'EXECUTED',
      date: '05.01.2019T08:23:19',
      from: 'Сберегательный счет 40817810644054865350',
      to: 'Visa Classic 4276 44** **** 3483',
      description: 'Перевод между своими счетами',
      operationAmount: { amount: '-15300.00', currency: { code: 'RUB', name: 'руб.' } },
      isMobilePayment: 'true',
      copyable: 'true',
      templatable: 'true',
      autopayable: 'false',
      type: 'payment',
      invoiceSubscriptionSupported: 'false',
      invoiceReminderSupported: 'false',
      form: 'InternalPayment',
      imageId: { staticImage: { url: null } },
      details: {
        fromResource:
          {
            name: 'fromResource',
            title: 'Счет списания',
            type: 'resource',
            required: 'false',
            editable: 'false',
            visible: 'true',
            resourceType:
              {
                availableValues:
                  {
                    valueItem:
                      {
                        value: 'account:573768749',
                        selected: 'true',
                        displayedValue: '408 17 810 6 44054865350 [Сберегательный счет]',
                        currency: 'RUB'
                      }
                  }
              },
            changed: 'false'
          },
        toResource:
          {
            name: 'toResource',
            title: 'Ресурс зачисления',
            type: 'resource',
            required: 'false',
            editable: 'false',
            visible: 'true',
            resourceType:
              {
                availableValues:
                  {
                    valueItem:
                      {
                        value: 'card:581110669',
                        selected: 'true',
                        displayedValue: '4276 44** **** 3483 [Visa Classic]',
                        currency: 'RUB'
                      }
                  }
              },
            changed: 'false'
          },
        buyAmount:
          {
            name: 'buyAmount',
            title: 'Сумма зачисления',
            type: 'money',
            required: 'false',
            editable: 'false',
            visible: 'true',
            moneyType: { value: '15300.00' },
            changed: 'false'
          }
      }
    }, { id: 'account', instrument: 'RUB' })).toEqual({
      hold: false,
      date: new Date('2019-01-05T08:23:19+03:00'),
      movements: [
        {
          id: '10950380712',
          account: { id: 'account:573768749' },
          invoice: null,
          sum: -15300.00,
          fee: null
        },
        {
          id: '10950380712',
          account: { id: 'card:581110669' },
          invoice: null,
          sum: 15300.00,
          fee: null
        }
      ],
      merchant: null,
      comment: null
    })
  })

  it('converts cash withdrawal', () => {
    expect(convertPayment({
      id: '11128289282',
      ufsId: null,
      state: 'FINANCIAL',
      date: '10.01.2019T20:18:16',
      from: 'Visa Classic 4276 52** **** 4451',
      to: 'Банкомат Сбербанка',
      description: 'Выдача наличных',
      operationAmount: { amount: '-200.00', currency: { code: 'RUB', name: 'руб.' } },
      isMobilePayment: 'false',
      copyable: 'false',
      templatable: 'false',
      autopayable: 'false',
      type: 'payment',
      invoiceSubscriptionSupported: 'false',
      invoiceReminderSupported: 'false',
      form: 'ExtCardCashOut',
      imageId: { staticImage: { url: 'https://pfm-stat.online.sberbank.ru/PFM/logos/33355.jpg' } }
    }, { id: 'account', instrument: 'RUB' })).toEqual({
      hold: false,
      date: new Date('2019-01-10T20:18:16+03:00'),
      movements: [
        {
          id: '11128289282',
          account: { id: 'account' },
          invoice: null,
          sum: -200,
          fee: null
        },
        {
          id: null,
          account: {
            type: 'cash',
            instrument: 'RUB',
            company: null,
            syncIds: null
          },
          invoice: null,
          sum: 200,
          fee: null
        }
      ],
      merchant: null,
      comment: null
    })
  })

  it('skips transaction with empty or zero operationAmount', () => {
    expect(convertPayment({
      id: '11413628056',
      ufsId: null,
      state: 'DRAFT',
      date: '11.01.2019T06:54:29',
      from: 'Visa Gold 4279 38** **** 0346',
      to: 'ООО "КОМПАНИЯ БКС"                                                                        40701810600007906728',
      description: 'Оплата услуг',
      isMobilePayment: 'false',
      copyable: 'true',
      templatable: 'true',
      autopayable: 'true',
      type: 'jurPayment',
      invoiceSubscriptionSupported: 'false',
      invoiceReminderSupported: 'false',
      form: 'RurPayJurSB',
      imageId: { staticImage: { url: null } }
    })).toBeNull()

    expect(convertPayment({
      autopayable: 'false',
      copyable: 'false',
      date: '31.12.2018T00:00:00',
      description: 'Капитализация по вкладу/счету',
      form: 'ExtDepositCapitalization',
      id: '6742338167',
      imageId: { staticImage: { url: null } },
      invoiceReminderSupported: 'false',
      invoiceSubscriptionSupported: 'false',
      isMobilePayment: 'false',
      operationAmount: {
        amount: '0.00',
        currency: { code: 'RUB', name: 'руб.' }
      },
      state: 'FINANCIAL',
      templatable: 'false',
      to: 'До востребования (руб)                    42301810755244611128',
      type: 'payment',
      ufsId: null
    })).toBeNull()
  })

  it('converts deposit capitalization', () => {
    expect(convertPayment({
      autopayable: 'false',
      copyable: 'false',
      date: '31.12.2018T00:00:00',
      description: 'Капитализация по вкладу/счету',
      form: 'ExtDepositCapitalization',
      id: '6742338167',
      imageId: { staticImage: { url: null } },
      invoiceReminderSupported: 'false',
      invoiceSubscriptionSupported: 'false',
      isMobilePayment: 'false',
      operationAmount: {
        amount: '10.00',
        currency: { code: 'RUB', name: 'руб.' }
      },
      state: 'FINANCIAL',
      templatable: 'false',
      to: 'До востребования (руб)                    42301810755244611128',
      type: 'payment',
      ufsId: null
    }, { id: 'account', instrument: 'RUB' })).toEqual({
      hold: false,
      date: new Date('2018-12-31T00:00:00+03:00'),
      movements: [
        {
          id: '6742338167',
          account: { id: 'account' },
          invoice: null,
          sum: 10,
          fee: null
        }
      ],
      merchant: null,
      comment: 'Капитализация по вкладу/счету'
    })
  })
})

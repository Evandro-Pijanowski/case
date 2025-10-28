import { test, expect } from "@playwright/test";
import LoadTestReporter from "../../../src/loadTestReporter"
import * as bookingData from "../utils/booking.json";
import { performanceTresholds, loadLevels} from "../utils/performanceConfig";

test.describe('Teste de perfromance API',() =>{
    test.describe.configure({mode: 'parallel'});
    test('Performance POST /booking', async ({request}) => {
        const startTime = performance.now();
        const response = await request.post("/booking", {
            data : bookingData
        });
        const endTime = performance.now();
        const responseTime = endTime - startTime;

        console.log(`Response Time: ${Math.round(responseTime)}ms`);
        console.log(`Status: ${response.status()}`);

        expect(response.status()).toBe(200);
        expect(responseTime).toBeLessThan(performanceTresholds.slow);
    });

    test('Performance GET /booking', async ({request}) => {
        const startTime = performance.now();
        const response = await request.get("/booking");
        const endTime = performance.now();
        const responseTime = endTime - startTime;

        console.log(`Response Time: ${Math.round(responseTime)}ms`);
        console.log(`Status: ${response.status()}`);

        expect(response.status()).toBe(200);
        expect(responseTime).toBeLessThan(performanceTresholds.critical);
    });

    test('Load Test | POST /booking', async ({ request }) => {
        //Ajustar esses valores de acordo como o cenário
        const treshold = performanceTresholds.critical;
        const load = loadLevels.medium;
        
        const promises = [];
        for (let i = 0; i < load; i++) {
            promises.push((async () => {
                const startTime = performance.now();
                const response = await request.post("/booking", {
                    data : bookingData
                });
                const endTime = performance.now();
                return {
                    responseTime: endTime - startTime,
                    status: response.status()
                };
            })());
        };
        const results = await Promise.all(promises);

        const responseTimes = results.map(r => r.responseTime);
        const avgResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
        const maxResponseTime = Math.max(...responseTimes);
        const minResponseTime = Math.min(...responseTimes);
        const successCount = results.filter(r => r.status === 200).length;
        let tookTooLongCount = 0;
        for (let i = 0; i < responseTimes.length; i++){
            if(responseTimes[i] > treshold){
                tookTooLongCount += 1;
            }
        } 

        console.log(`Load Test Results:`);
        console.log(`   Total Requests: ${load}`);
        console.log(`   Successful: ${successCount}`);
        console.log(`   Min Response Time: ${Math.round(minResponseTime)}ms`);
        console.log(`   Max Response Time: ${Math.round(maxResponseTime)}ms`);
        console.log(`   Avg Response Time: ${Math.round(avgResponseTime)}ms`);
        console.log(`   Number of request that took too long: : ${tookTooLongCount}`);

    const resultsReport = {
        totalRequests: load,
        successful: successCount,
        minResponseTime: minResponseTime,
        maxResponseTime: maxResponseTime,
        avgResponseTime: avgResponseTime,
        tookTooLong: tookTooLongCount,
        threshold: treshold,
        loadLevel: load,
        endpoint: '/booking',
        timestamp: new Date().toISOString()
    };    
  
    await fetch('http://localhost:4000/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resultsReport)
    });
 
    expect(successCount).toBe(load);
    expect(avgResponseTime).toBeLessThan(treshold);
    });
});
TODO: Write actual tests for these.

MtF + FtM question flows should show popups, finishing them should show a gantt chart.

Download the json/image should work

Re-uploading the json should generate the chart again

1. Should see "new MtF", "new FtM" and "Upload Existing Plan" buttons when the page loads
2. Pressing "New MtF" plan should show a dialog with choices for the MtF plan. There should be 4 rounds of choices (status, date, number and days between). Going through all choices should create a Gantt Chart at the bottom of the screen.

3. Pressing "new FtM" should show a dialog for FtM choices. There should be 4 rounds of choices. Going through all choices should create a Gantt Chart at the bottom of the screen.

4. For FtM/MtF - If a choice on the first screen is selected as "won't do", this should be greyed out in future options

5. Once you've generated an FtM Plan, the "Create MtF" should hide

6. Once you've generated an MtF plan, the "Create FtM" button should hide

7. The Gantt Chart should show all transition details; hovering over the bottom left should highlight specific tasks.

8. Pressing Edit Plan should bring up all the plan specifics. Pressing save should update the Gantt Chart.

9. Pressing Download Plan should download a JSON object for the plan

10. Pressing Download Image should download the full PNG for the transition plan

11. Pressing "Upload Existing Plan" should update the Gantt Chart and allow edits to the uploaded plan

12. Pressing "new MtF" or "new FtM" after uploading a plan should show the create menus, pre-populated with the plan dates




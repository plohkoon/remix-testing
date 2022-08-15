from locust import HttpUser, TaskSet, task, between


class TestUser(HttpUser):
    wait_time = between(1, 1)

    @task
    def index(self):
        self.client.get("/", name="index_page")

    @task
    def index_data(self):
        self.client.get("/?_data=root", name="index_data")

    @task
    def one(self):
        self.client.get("/1", name="one_page")

    @task
    def one_data(self):
        self.client.get("/1?_data=routes/1", name="one_data")

    @task
    def ten(self):
        self.client.get("/10", name="ten_page")

    @task
    def ten_data(self):
        self.client.get("/10?_data=routes/10", name="ten_data")

    @task
    def fifty(self):
        self.client.get("/50", name="fifty_page")

    @task
    def fifty_data(self):
        self.client.get("/50?_data=routes/50", name="fifty_data")

    @task
    def hundred(self):
        self.client.get("/100", name="hundred_page")

    @task
    def hundred_data(self):
        self.client.get("/100?_data=routes/100", name="hundred_data")

    @task
    def five_hundred(self):
        self.client.get("/500", name="five_hundred_page")

    @task
    def five_hundred_data(self):
        self.client.get("/500?_data=routes/500", name="five_hundred_data")

    @task
    def thousand(self):
        self.client.get("/1000", name="thousand_page")

    @task
    def thousand_data(self):
        self.client.get("/1000?_data=routes/1000", name="thousand_data")

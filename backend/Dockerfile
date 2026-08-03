FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
COPY chorest/target/chorest-0.0.1-SNAPSHOT.jar .
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "chorest-0.0.1-SNAPSHOT.jar"]
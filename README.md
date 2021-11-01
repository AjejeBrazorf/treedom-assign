# Treedom task

### Come far paritre il progetto

```
npm install
npm run start
```
Stupiti, uh?   
<img src="https://user-images.githubusercontent.com/12338075/139662136-facbe465-a6f8-4598-bab4-b3bcb7e39b34.png" width="100">
### Note sull'implementazione:

L'idea di base é quella di fornire un esperienza di utilizzo simile a quella dello [stepper di Angular Material](https://material.angular.io/components/stepper/overview).

Per riuscirci ho deciso utilizzare la `content projection` e `structural directive` fornite da Angular.  
Quindi la direttiva `appStep` si occupa di definire i contenuti dei singoli step e il componente `app-stepper` si occupa di mostrarne uno alla volta.

L'`app-component` infine si occupa di definire i form e layouts dei singoli step.

Tutto 🌹 rose e 💐 fiori fin qui, tuttavia ci sono degli aspetti che non sono riuscito a gestire:
1) Distinzione tra validazioni sync e async:  
Le validazioni sincrone ed asincrone sono gestite completamente dalle configurazioni dei singoli form-step.  
Questi sono dei `reactive form`, che permettono il fire delle validazioni solo  on `change`, `blur` o `submit` senza poter discernere fra validazioni sincrone ed asincrone out of the box.  
Solitamente per riuscirci procedo aggiungendo solo i validatori sincroni nella configurazione del form e quelli asincroni con un bind all'evento `ngSubmit` via template.  
In questo caso peró il template del `FormGroup` (e quindi anche la possibilitá di ascoltare l'evento `ngSubmit`) é definito all'interno dell' `app-stepper`, il quale non é a conoscenza di quali siano i validatori asincroni di quello step.

2) Validare il form solo on `submit`:   
La validazione dei form viene effettuata sia on `submit`, sia ogni volta che il form viene bindato alla view (questo effetto é molto chiaro se si prova a validare il primo step, passare al secondo e tornare indietro al primo, il form lampeggerá indicando il suo stato `PENDING` dovuto alla validazione asincrona ).
Onestamente, non ho idea di come gestire questa cosa.
